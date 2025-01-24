import React from "react";
import "../App.css";

const Login: React.FC = () => {
    return (
        <div className="login">
            <h1>Log In</h1>
            <form>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
