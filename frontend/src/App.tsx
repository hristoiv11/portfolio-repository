import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews.tsx';
import Navbar from "./navbar/Navbar.tsx";
import Login from "./pages/Login.tsx";
import Logout from "./pages/Logout.tsx";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Experiences from "./pages/Experiences.tsx";

function App() {

    const { t} = useTranslation();

    useEffect(() => {

        const sessionActive = sessionStorage.getItem("sessionActive");
        if (!sessionActive) {
            localStorage.removeItem("adminToken");
            sessionStorage.setItem("sessionActive", "true");
        }
    }, []);

    return (
        <Router>
            <Navbar/>
            <div className="main-content">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            </div>
            <footer className="footer">
                © Hristo Georgiev Ivanov. {t("footerMessage")}
            </footer>
        </Router>
    );
}

export default App;
