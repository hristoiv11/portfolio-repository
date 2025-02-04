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

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                {/*<Route path="/reviews" element={<Reviews />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
