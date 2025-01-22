"use client"
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CommentType {
    id: number;
    postId: number;
    userId?: number | null;
    user_name: string; // User's username
    parentCommentId?: number | null;
    content: string;
    createdAt: string;
    children: CommentType[];
  }
  
  interface PostType {
    id: number;
    userId: number;
    user_name: string; // User's username
    categoryId?: number | null;
    categoryName: string; // Category name
    title: string;
    content: string;
    isApproved: boolean;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    likeCount: number;
    comments: CommentType[];
  }
  
  
const PostPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [data, setData] = useState<PostType | null>(null);
    useEffect(() => {
        getPostDetails();
    }, [id]);
    const getPostDetails = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getPost', {
                params: {
                    post_id: id,
                },
            });
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    return (
        <div>
    {data && (
        <div>
            <h1>{data.title}</h1>
            <p>By {data.user_name} in {data.categoryName}</p>
            <p>{data.content}</p>
            <p>Views: {data.viewCount} | Likes: {data.likeCount}</p>
            <p>Created at: {new Date(data.createdAt).toLocaleString()}</p>
            <p>Updated at: {new Date(data.updatedAt).toLocaleString()}</p>
            <h2>Comments</h2>
            {data.comments.length > 0 ? (
                <ul>
                    {data.comments.map(comment => (
                        <li key={comment.id}>
                            <p>{comment.user_name}: {comment.content}</p>
                            <p>Posted at: {new Date(comment.createdAt).toLocaleString()}</p>
                            {comment.children.length > 0 && (
                                <ul>
                                    {comment.children.map(child => (
                                        <li key={child.id}>
                                            <p>{child.user_name}: {child.content}</p>
                                            <p>Posted at: {new Date(child.createdAt).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    )}
    </div>
    );
};

export default PostPage;