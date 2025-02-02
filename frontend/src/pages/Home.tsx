import React, { useState } from 'react';
import "../App.css";

const Home: React.FC = () => {
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
            <h1>Welcome to My Portfolio</h1>
            <p>
                Hi, I'm Hristo, a passionate software developer dedicated to crafting innovative applications that solve real-world problems.
            </p>

            <div className="button-group">
                {/* Download CV Button */}
                <div className="dropdown-container">
                    <button
                        onClick={() => setShowCVOptions(!showCVOptions)}
                        className="btn"
                    >
                        Download CV
                    </button>
                    {showCVOptions && (
                        <div className="dropdown-menu">
                            <button
                                onClick={() => handleDownloadCV("English")}
                                className="dropdown-item"
                            >
                                English CV
                            </button>
                            <button
                                onClick={() => handleDownloadCV("Français")}
                                className="dropdown-item"
                            >
                                Français CV
                            </button>
                        </div>
                    )}
                </div>

                <button onClick={handleLeaveReview} className="btn">
                    Leave a Review
                </button>
            </div>
        </div>
    );
};

export default Home;
