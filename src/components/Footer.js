import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 сделано яхе.</p>
      <div>
        <a href="https://github.com/твой-github" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://t.me/твой-тг" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </div>
    </footer>
  );
}

export default Footer;
