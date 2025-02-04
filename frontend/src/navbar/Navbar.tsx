import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../App.css";
//import '../css/Navbar.css';
const Navbar: React.FC = () => {

    const [isAdmin, setIsAdmin] = useState<boolean>(!!localStorage.getItem("adminToken"));
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token);
    }, [localStorage.getItem("adminToken")]); // Watch localStorage changes

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsAdmin(false);
        navigate("/"); // Redirect to Home
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <span>Hristo Georgiev Ivanov</span>
                </div>
                <div className="navbar-center">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                        <li><Link to="/skills">Skills</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/reviews">Reviews</Link></li>
                    </ul>
                </div>
                <div className="navbar-login">
                    {!isAdmin ? (
                        <Link to="/login" className="login-button">Log In</Link>
                    ) : (
                        <button className="logout-button" onClick={handleLogout}>Log Out</button>
                    )}
                </div>
            </nav>

            {isAdmin && (
                <div className="admin-status">
                    Logged in as Admin
                </div>
            )}
        </>
    );
};

export default Navbar;
