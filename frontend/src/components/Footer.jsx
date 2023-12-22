// Footer.jsx

import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4">
      <div className="container px-3">
        <div className="row">
          <div className="col-md-4">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, quam vitae interdum sagittis, ex odio consequat nisi.
            </p>
          </div>
          <div className="col-md-4">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="/">Services</a></li>
              <li><a href="/">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Connect with Us</h3>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Fb</a></li>
              <li><a href="/" className="text-light">Tw</a></li>
              <li><a href="/" className="text-light">Ins</a></li>
              <li><a href="/" className="text-light">Linked</a></li>
            </ul>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="row">
          <div className="col-md-6">
            <h4>Contact Us</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name" className="text-light">Name</label>
                <input type="text" className="form-control" id="name" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-light">Email</label>
                <input type="email" className="form-control" id="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="text-light">Message</label>
                <textarea className="form-control" id="message" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-light">Send Message</button>
            </form>
          </div>
          <div className="col-md-3 offset-md-3">
            <h4>Site Map</h4>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="/">Services</a></li>
              <li><a href="/">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p>&copy; {currentYear} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
