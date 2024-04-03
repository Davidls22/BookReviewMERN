import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CreateEntry.css";
import toast, { Toaster } from 'react-hot-toast';

const CreateEntry = ({ onPostCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [bookCoverUrl, setBookCoverUrl] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}+inauthor:${author}&key=AIzaSyD1QNPH3mSqApJSYGHt8mREUQ6F3bwYS4M`);
        if (response.data.items && response.data.items.length > 0) {
          const bookInfo = response.data.items[0].volumeInfo;
          const coverUrl = bookInfo.imageLinks?.thumbnail || ''; 
          const genre = bookInfo.categories?.[0] || ''; 
          
          setBookCoverUrl(coverUrl);
          setGenre(genre);
        } else {
         
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
        
      }
    };
  
    // Fetch book details whenever the title or author changes
    if (title && author) {
      fetchBookDetails();
    }
  }, [title, author]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/entries", {
        title,
        rating,
        content,
        author,
        bookCoverUrl,
        genre
      });
      console.log("Blog entry created successfully!");
      // Show success notification
      notify();
    } catch (error) {
      console.error("Error creating blog entry:", error);
    }
  };

  const notify = () =>  toast.success('Book Successfully Reviewed!');

  return (
    <div className="create-entry-container">
      <h2 className="create-entry-title">Review a Book!</h2>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit} className="create-entry-form">
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
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};


export default CreateEntry;
