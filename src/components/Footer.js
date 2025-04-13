import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 </p>
      <div>
      <a href="tel:+992929281129" style={{
  backgroundColor: '#28a745',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '10px',
  textDecoration: 'none',
  display: 'inline-block'
}}>
  📞 yasan:
</a>

        <a href="https://t.me/твой-тг" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
      </div>
    </footer>
  );
}






export default Footer;
