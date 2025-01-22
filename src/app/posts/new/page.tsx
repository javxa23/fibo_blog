'use client';
import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import axios from 'axios';
import { useUser } from '@/contexts/userContext';
import { useRouter } from 'next/navigation';

const Editor = () => {

  const [title, setTitle] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [category_id, setCategory_id] = useState<number | undefined>(undefined);
  const { userId } = useUser();

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Bold,
      Italic,
      Underline,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "Start typing here...",
    autofocus: true,
    editable: true,
  });

  if (!editor) {
    return null;
  }
  const content = JSON.stringify(editor.getJSON());
  const handleSubmit = async () => {
    if (!userId) {
      console.error('User ID is null');
      return;
    }
    const user_id: number = +userId;
    console.log(`${[user_id, category_id, title, content]}`);
    setErrorMessages('');
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8080/createPost', {user_id, category_id, title, content});
      console.log('Post submitted successfully:', response.data);
      setIsSubmitted(true);
      router.push('/posts');
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.response?.data || error.message);
      } else {
        console.error('Error submitting post:', error);
      }
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen text-black">
      <div>
        <label htmlFor="category">Choose a category:{category_id}</label>
        <select
          id="category"
          value={category_id}
          onChange={(e) => setCategory_id(Number(e.target.value))}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={250}
          className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl
          flex border shadow-sm transition-colors file:border-0 file:bg-transparent 
          file:text-sm file:font-medium text-black placeholder:text-zinc-500 focus-visible:outline-none 
          focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50
          dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 border-zinc-600 bg-[#2F2E2E]
          dark:border-zinc-600 dark:bg-[#2F2E2E] px-6 py-3 font-thin rounded-lg"
        />
      </div>

      {/* Rich Text Editor Buttons */}
      <div className="flex space-x-2 mb-4">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-2 border rounded ${editor.isActive('bold') ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"lucide:bold"} className="text-[20px]" />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-2 border rounded ${editor.isActive('italic') ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"lucide:italic"} className="text-[22px]" />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`px-3 py-2 border rounded ${editor.isActive('underline') ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"lucide:underline"} className="text-[22px]" />
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className={`px-3 py-2 border rounded ${editor.isActive('paragraph') ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"mingcute:paragraph-line"} className="text-[22px]" />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-3 py-2 border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"lucide:heading-1"} className="text-[22px]" />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-3 py-2 border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"lucide:heading-2"} className="text-[22px]" />
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`px-3 py-2 border rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-zinc-200 text-black' : 'text-white'}`}>
          <Icon icon={"lucide:heading-3"} className="text-[22px]" />
        </button>
        <button onClick={() => editor.chain().focus().insertContent('<pre><code class="language-javascript">console.log("Hello World");</code></pre>').run()} className="px-3 py-2 border rounded text-white">
          Insert Code
        </button>
      </div>

      {/* Editor Content */}
      <div className="w-full max-w-4xl border border-gray-300 rounded-lg shadow-md bg-[#2F2E2E]">
        <EditorContent editor={editor} className="prose p-4 focus:outline-none text-white" />
      </div>
      <p className='text-red-500 font-grotesk'>{errorMessages}</p>
      <div className="p-[1px] bg-gradient-to-br from-yellow-500 to-orange-500 rounded-md w-fit relative z-[1] duration-300 mt-4">
        <button onClick={handleSubmit} disabled={isSubmitting} className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 h-9 text-white bg-zinc-800 px-12 py-6 text-lg ${isSubmitting ? 'opacity-50' : ''}`}>
        {isSubmitting ? 'Submitting...'
        : isSubmitted ? 'Submit Done' : 'Submit Post'}
        </button>
      </div>
      <div className="mt-4 w-full max-w-4xl bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">JSON Output:</h2>
        <pre className="text-sm font-mono text-gray-700">{content}</pre>
      </div>
    </div>
  );
};

export default Editor;
