import React, { useState } from "react";
import axios from "axios";
import "../CreateEntry.css";
import toast, { Toaster } from 'react-hot-toast';

const CreateEntry = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/entries", {
        title,
        rating,
        content,
        author,
      });
      console.log("Blog entry created successfully!");
      // Call the function passed from the parent component to update the list of blog posts
      onPostCreated(response.data);
    } catch (error) {
      console.error("Error creating blog entry:", error);
    }
  };

  const notify = () =>  toast.success('Book Successfully Reviewed!');

  return (
    <div className="create-entry-container">
      {" "}
     
      <h2 className="create-entry-title">Review a Book!</h2>{" "}
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <form onSubmit={handleSubmit} className="create-entry-form">
        {" "}
       
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
          />
        </div>
        <button onClick={notify} type="submit" className="submit-btn">
          Submit
        </button>{" "}
      </form>
    </div>
  );
};

export default CreateEntry;
