import React, { useState } from "react";
import "../App.css";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: "", email: "", subject: "",message: "" });
    const [isSending, setIsSending] = useState(false); // ✅ Disable button when sending
    const [statusMessage, setStatusMessage] = useState<string | null>(null); // ✅ Display status message

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setStatusMessage(null);

        try {
            const response = await fetch("http://localhost:8080/api/contact/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatusMessage("✅ Message sent successfully!");
                setFormData({ name: "", email: "", subject:"", message: "" }); // Clear form

                // ✅ Hide the message after 5 seconds
                setTimeout(() => {
                    setStatusMessage(null);
                }, 3000);

            } else {
                setStatusMessage("❌ Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setStatusMessage("❌ Error: Could not send the message.");
        } finally {
            setIsSending(false);
        }
    };

    const aboutData = {
        email: "hristogr85@gmail.com",
        linkedin: "https://www.linkedin.com/in/hristo-ivanov-a65245327/",
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                {/* Contact Info */}
                <div className="contact-info-section">
                    <h1>Contact Info</h1>
                    <div className="contact-info">
                        <p>Email: {aboutData.email}</p>
                        <p>
                            LinkedIn:{" "}
                            <a
                                href={aboutData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {aboutData.linkedin}
                            </a>
                        </p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-section">
                    <h1>Contact Me</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Subject:
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Message:
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>
                        <button type="submit" disabled={isSending}>
                            {isSending ? "Sending..." : "Send"}
                        </button>
                    </form>
                    {statusMessage && <p className="status-message">{statusMessage}</p>} {/* ✅ Show status message */}
                </div>
            </div>
        </div>
    );
};

export default Contact;
