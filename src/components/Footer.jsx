import { Link } from 'react-router-dom';
import './Footer.css'; 

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <span>&copy; {currentYear} DevLore Tech Quiz. All rights reserved.</span>
        
        <span className="separator">|</span>
        <Link to="/">Home</Link>
        
        <span className="separator">|</span>
        <Link to="/setup">Start Quiz</Link>
        
        <span className="separator">|</span>
        <Link to="/progress">Dashboard</Link>
      </div>
    </footer>
  );
}

export default Footer;