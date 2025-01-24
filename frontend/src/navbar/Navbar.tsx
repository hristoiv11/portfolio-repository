import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/skills">Skills</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
            </ul>
            <div className="navbar-login">
                <Link to="/login" className="login-button">Log In</Link>
            </div>
        </nav>
    );
};

export default Navbar;
