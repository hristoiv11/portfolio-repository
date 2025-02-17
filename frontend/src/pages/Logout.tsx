import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useTranslation} from "react-i18next";
const Logout: React.FC = () => {
    const { t} = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("adminToken");

        // ✅ Ensure admin status updates immediately
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
            navigate("/");
        }, 2000);
    }, [navigate]);

    return (
        <div className="logout">
            <h1>{t("logoutTitle")}</h1>
            <p>{t("logoutMessage")}</p>
        </div>
    );
};

export default Logout;
