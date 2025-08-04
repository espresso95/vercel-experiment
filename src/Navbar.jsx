import React from 'react';

function Navbar() {
  const navStyle = {
    backgroundColor: '#333',
    padding: '1rem',
  };

  const listStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    marginRight: '1rem',
  };

  return (
    <nav style={navStyle}>
      <ul style={listStyle}>
        <li><a href="#" style={linkStyle}>Home</a></li>
        <li><a href="#" style={linkStyle}>About</a></li>
        <li><a href="#" style={linkStyle}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
