import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <a href="/" className="footer-link">Home</a>
      <a href="/" className="footer-link">Events</a>
      <a href="/login" className="footer-link">Login</a>
      <a href="/register" className="footer-link">Register</a>
    </div>
    <div className="footer-social">
      <a href="https://github.com/" className="footer-social-icon" aria-label="GitHub" rel="noopener noreferrer" target="_blank">🐙</a>
      <a href="https://twitter.com/" className="footer-social-icon" aria-label="Twitter" rel="noopener noreferrer" target="_blank">🐦</a>
      <a href="https://linkedin.com/" className="footer-social-icon" aria-label="LinkedIn" rel="noopener noreferrer" target="_blank">💼</a>
    </div>
    <div className="footer-copy">&copy; {new Date().getFullYear()} Event Management System. All rights reserved.</div>
  </footer>
);

export default Footer;
