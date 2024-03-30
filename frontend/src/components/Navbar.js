import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <ul> 
        <li>
          <Link to="/">Book Reviews</Link>
        </li>
        <li>
          <Link to="/CreateReviews">Add a Review</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
