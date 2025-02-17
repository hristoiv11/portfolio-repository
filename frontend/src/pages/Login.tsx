import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {useTranslation} from "react-i18next";

const Login: React.FC = () => {
    const { t} = useTranslation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const authBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Auth Backend URL:", authBackendUrl);
    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        const loginUrl = `${authBackendUrl}api/auth/login`;
        console.log("Logging in via:", loginUrl);

        try {
            const response = await fetch(loginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(t("invalidCredentials"));
            }

            const data = await response.json();
            localStorage.setItem("adminToken", data.token); // Store JWT token

            // ✅ Ensure admin status updates immediately
            window.dispatchEvent(new Event("storage"));

            navigate("/");
        } catch (err) {
            setError(t("loginError"));
        }
    };

    return (
        <div className="login-page">
        <div className="login">
            <h1>{t("loginTitle")}</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">{t("loginUsername")}:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">{t("loginPassword")}:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{t("loginButton")}</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
