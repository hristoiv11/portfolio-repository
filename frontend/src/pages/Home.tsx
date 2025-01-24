import React from 'react';
import "../App.css";

const Home: React.FC = () => {
    const handleDownloadCV = () => {
        const cvUrl = "/cv/Hristo_Ivanov_CV.pdf"; // Replace with the actual path to your CV
        window.open(cvUrl, "_blank");
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
                <button onClick={handleDownloadCV} className="btn">
                    Download CV
                </button>
                <button onClick={handleLeaveReview} className="btn">
                    Leave a Review
                </button>
            </div>
        </div>
    );
};

export default Home;
