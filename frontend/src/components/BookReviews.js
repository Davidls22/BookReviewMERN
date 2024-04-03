import React, { useState, useEffect } from "react";
import axios from "axios";
import "../BlogEntries.css";

const BlogEntries = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Function to fetch blog posts
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/entries");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    // Call the function to fetch blog posts
    fetchBlogPosts();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to add a new post to the list
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  // Function to delete a post
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/entries/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      console.log("Blog entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog entry:", error);
    }
  };

  return (
    <div className="blog-entries-container">
      <h1 className="blog-title">My Book Reviews</h1>
      <div className="blog-posts-list">
        {posts.map((post) => (
          <div key={post._id} className="blog-post-item">
            <div className="card">
              <img
                src={post.bookCoverUrl}
                alt="Book Cover"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.rating}/5</p>
                <p className="card-text">{post.content}</p>
                <p className="card-text">
                  <small className="text-muted">Author: {post.author}</small>
                </p>
                <p className="card-text">
                  <small className="text-muted">Genre: {post.genre}</small>
                </p>
                <button className="button" onClick={() => handleDelete(post._id)}>
              Delete
            </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogEntries;
