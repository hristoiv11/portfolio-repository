/*
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface Name {
  id: number;
  name: string;
  lastName: string;
}

function App() {
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);
  const [names, setNames] = useState<Name[]>([]);

  // Fetch the message from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/hello') // Backend endpoint for a simple message
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => setBackendMessage(data))
      .catch((error) => console.error('Error fetching data from backend:', error));
  }, []);

  // Fetch the items from the database
  useEffect(() => {
    fetch('http://localhost:8080/api/items') // Backend endpoint for fetching items
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching items from backend:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/names') // Backend endpoint for fetching items
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => setNames(data))
      .catch((error) => console.error('Error fetching items from backend:', error));
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Message from Backend:</h2>
      <p>{backendMessage ? backendMessage : 'Loading...'}</p>

      <h2>Items from Database:</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong>: {item.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading items...</p>
      )}

      <h2>Items from Database:</h2>
      {names.length > 0 ? (
        <ul>
          {names.map((name) => (
            <li key={name.id}>
              <strong>{name.name}</strong>: {name.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading items...</p>
      )}
    </>
  );
}

export default App;
*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Navbar from "./navbar/Navbar.tsx";
import Login from "./pages/Login.tsx";

function App() {
    return (
        <Router>
            <div className="header-left">
                <h1>Hristo Georgiev Ivanov</h1>
            </div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/login" element={<Login />} />
                {/*<Route path="/reviews" element={<Reviews />} />*/}
            </Routes>
        </Router>
    );
}

export default App;
