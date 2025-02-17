import React, { useState } from 'react';
import "../App.css";
import {useTranslation} from "react-i18next";
import {t} from "i18next";

const Home: React.FC = () => {
    const { i18n } = useTranslation();
    const [showCVOptions, setShowCVOptions] = useState<boolean>(false);

    const handleDownloadCV = (language: string) => {
        const cvUrl =
            language === "English"
                ? "/cv/Hristo_Ivanov_CV_English.pdf"
                : "/cv/Hristo_Ivanov_CV_Français.pdf";
        const link = document.createElement("a");
        link.href = cvUrl;
        link.setAttribute("download", cvUrl.split("/").pop() || "CV.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setShowCVOptions(false);
    };

    const handleLeaveReview = () => {
        window.location.href = "/reviews"; // Replace with your actual reviews route
    };

    return (
        <div className="home">
            <h1>{t("title")}</h1>
            <p>{t("description")}</p>

            <div className="button-group">
                {/* Download CV Button */}
                <div className="dropdown-container">
                    <button
                        onClick={() => setShowCVOptions(!showCVOptions)}
                        className="btn"
                    >
                        {t("downloadCV")}
                    </button>
                    {showCVOptions && (
                        <div className="dropdown-menu">
                            <button
                                onClick={() => handleDownloadCV("English")}
                                className="dropdown-item"
                            >
                                {t("cvEnglish")}
                            </button>
                            <button
                                onClick={() => handleDownloadCV("French")}
                                className="dropdown-item"
                            >
                                {t("cvFrench")}
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={handleLeaveReview} className="btn">
                    {t("leaveReview")}
                </button>
            </div>
        </div>
    );
};

export default Home;
