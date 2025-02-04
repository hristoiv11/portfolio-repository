import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("adminToken");

        // ✅ Ensure admin status updates immediately
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
            navigate("/");
        }, 1000);
    }, [navigate]);

    return (
        <div className="logout">
            <h1>Logging Out...</h1>
            <p>You will be redirected to the home page.</p>
        </div>
    );
};

export default Logout;
