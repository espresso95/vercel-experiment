import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="navbar-logo">
            MyApp
          </a>
        </div>
        
        <div className="navbar-menu">
          <ul className="navbar-nav">
            <li className="navbar-item">
              <a href="/" className="navbar-link">
                Home
              </a>
            </li>
            <li className="navbar-item">
              <a href="/about" className="navbar-link">
                About
              </a>
            </li>
            <li className="navbar-item">
              <a href="/services" className="navbar-link">
                Services
              </a>
            </li>
            <li className="navbar-item">
              <a href="/contact" className="navbar-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        <div className="navbar-toggle">
          <button className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
