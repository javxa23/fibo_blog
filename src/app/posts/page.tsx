"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns"
import { useRouter } from "next/navigation";

type PostListType = {
  id: number;
  title: string;
  username: string;
  category_name: string;
  is_approved: boolean;
  view_count: number;
  created_at: string;
};

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostListType[]>([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:8080/getPostsList")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="flex flex-col font-grotesk text-zinc-300 px-5 py-2">
      <div className="w-[50lvw]">
        {posts.map((post) => (
          <div key={post.id}
            onClick={()=>router.push(`/posts/${post.id}`)}
            className="p-px bg-gradient-to-br from-zinc-800 via-zinc-400 rounded-lg my-2 cursor-pointer">
            <div className="bg-zinc-900 rounded-lg p-2">
              <div className="flex justify-between items-center">
                <p className="">
                  By {post.username}</p>
                <p>{format(new Date(post.created_at), "yyyy MMM dd HH:mm")}</p>
              </div>
              <p className="font-bold text-3xl text-white my-1.5">
                {post.title}
              </p>
              <div className="flex justify-between items-center mt-1">
                <div className="bg-zinc-700 rounded-full px-2 py-0.5 text-[13px]">{post.category_name}</div> 
                <div>
                  <p>Views: {post.view_count}</p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
