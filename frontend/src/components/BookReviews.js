import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../BlogEntries.css';


const BlogEntries = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Function to fetch blog posts
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/entries');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        // Call the function to fetch blog posts
        fetchBlogPosts();
    }, []); // Empty dependency array ensures this effect runs only once

    // Function to add a new post to the list
    const addNewPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
    };

    // Function to delete a post
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/entries/${id}`);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
            console.log('Blog entry deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog entry:', error);
        }
    };

    return (
        <div className="blog-entries-container"> 
            <h1 className="blog-title">My Book Reviews</h1> 
                {posts.map(post => (
                    <div key={post._id} className="blog-post-item"> 
                        <h3 className="post-title">{post.title}</h3> 
                        <p className="post-content">{post.rating}/5</p> 
                        <p className="post-content">{post.content}</p> 
                        <p className="post-author">Author: {post.author}</p> 
                        <button className="button"onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                ))}
        </div>
    );
};

export default BlogEntries;
