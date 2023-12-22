// NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container my-5 text-center">
      <h1 className="display-1">404</h1>
      <p className="lead">Oops! Page not found</p>
      <p>The page you are looking for might be in another castle.</p>
      <Link to="/">
        <button className="btn btn-primary">Go Home</button>
      </Link>
      <div className="mt-5">
        <h3>Explore some popular pages:</h3>
        <ul className="list-unstyled">
          <li>
            <Link to="/blog/markdown">Markdown Editor</Link>
          </li>
          <li>
            <Link to="/blog/quill">Quill Editor</Link>
          </li>
          {/* Add more popular pages as needed */}
        </ul>
      </div>
      <div className="mt-5">
        <p>Contact support if you believe this is an error.</p>
        <p>Email: support@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
};

export default NotFound;
