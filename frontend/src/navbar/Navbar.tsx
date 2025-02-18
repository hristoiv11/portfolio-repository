import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../App.css";
import {useTranslation} from "react-i18next";
//import '../css/Navbar.css';
const Navbar: React.FC = () => {
    const { i18n, t } = useTranslation();
    const [isAdmin, setIsAdmin] = useState<boolean>(!!localStorage.getItem("adminToken"));
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token);

        // Detect screen size changes
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    }, [localStorage.getItem("adminToken")]); // Watch localStorage changes

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsAdmin(false);
        navigate("/logout"); // Redirect to Home
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

                {isMobile && (
                    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </button>
                )}

                <div className={`navbar-center ${isMobile && menuOpen ? "open" : ""} ${isMobile ? "mobile-menu" : ""}`}>
                    <ul>
                        <li><Link to="/" onClick={() => setMenuOpen(false)}>{t("home")}</Link></li>
                        <li><Link to="/about" onClick={() => setMenuOpen(false)}>{t("about")}</Link></li>
                        <li><Link to="/projects" onClick={() => setMenuOpen(false)}>{t("projects")}</Link></li>
                        <li><Link to="/skills" onClick={() => setMenuOpen(false)}>{t("skills")}</Link></li>
                        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>{t("contact")}</Link></li>
                        <li><Link to="/reviews" onClick={() => setMenuOpen(false)}>{t("reviews")}</Link></li>

                        {/* Move Language Switcher and Login inside the menu on mobile */}
                        {isMobile && (
                            <>
                                <li>
                                    <button onClick={() => { toggleLanguage(); setMenuOpen(false); }} className="language-toggle">
                                        {i18n.language === "en" ? "FR" : "EN"}
                                    </button>
                                </li>
                                <li>
                                    {!isAdmin ? (
                                        <Link to="/login" className="login-button" onClick={() => setMenuOpen(false)}>
                                            {t("login")}
                                        </Link>
                                    ) : (
                                        <button className="logout-button" onClick={() => { handleLogout(); setMenuOpen(false); }}>
                                            {t("logout")}
                                        </button>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Desktop only: Language Switcher & Login Buttons */}
                {!isMobile && (
                    <div className="navbar-icons">
                        <div className="language-switcher">
                            <button onClick={toggleLanguage} className="language-toggle">
                                {i18n.language === "en" ? "FR" : "EN"}
                            </button>
                        </div>
                        <div className="navbar-login">
                            {!isAdmin ? (
                                <Link to="/login" className="login-button">{t("login")}</Link>
                            ) : (
                                <button className="logout-button" onClick={handleLogout}>{t("logout")}</button>
                            )}
                        </div>
                    </div>
                )}
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
