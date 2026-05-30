import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <h2 className="brand">DevLore</h2>
        <ul className="navbar-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/progress">Progress</Link>
        </li>
        <li>
          <Link to="/setup">Start Quiz</Link>
        </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;