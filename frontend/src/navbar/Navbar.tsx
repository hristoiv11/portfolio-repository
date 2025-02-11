import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../App.css";
import {useTranslation} from "react-i18next";
//import '../css/Navbar.css';
const Navbar: React.FC = () => {
    const { i18n, t } = useTranslation();
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

    // Toggle Language between EN and FR
    const toggleLanguage = () => {
        const newLanguage = i18n.language === "en" ? "fr" : "en";
        i18n.changeLanguage(newLanguage);
        localStorage.setItem("i18nextLng", newLanguage);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <span>Hristo Georgiev Ivanov</span>
                </div>
                <div className="navbar-center">
                    <ul>
                        <li><Link to="/">{t("home")}</Link></li>
                        <li><Link to="/about">{t("about")}</Link></li>
                        <li><Link to="/projects">{t("projects")}</Link></li>
                        <li><Link to="/skills">{t("skills")}</Link></li>
                        <li><Link to="/contact">{t("contact")}</Link></li>
                        <li><Link to="/reviews">{t("reviews")}</Link></li>
                    </ul>
                </div>

                <div className="language-switcher">
                    <button onClick={toggleLanguage} className="language-toggle">
                        {i18n.language.toUpperCase()}
                    </button>
                </div>

                <div className="navbar-login">
                    {!isAdmin ? (
                        <Link to="/login" className="login-button">{t("login")}</Link>
                    ) : (
                        <button className="logout-button" onClick={handleLogout}>{t("logout")}</button>
                    )}
                </div>
            </nav>

            {isAdmin && (
                <div className="admin-status">
                    {t("loggedAsAdmin")}
                </div>
            )}
        </>
    );
};

export default Navbar;
