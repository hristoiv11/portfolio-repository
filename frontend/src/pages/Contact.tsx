import React, { useState } from "react";
import "../App.css";
import {useTranslation} from "react-i18next";

const Contact: React.FC = () => {
    const { t } = useTranslation();
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
                setStatusMessage(t("formSuccess"));
                setFormData({ name: "", email: "", subject:"", message: "" }); // Clear form

                // ✅ Hide the message after 5 seconds
                setTimeout(() => {
                    setStatusMessage(null);
                }, 3000);

            } else {
                setStatusMessage(t("formFailure"));
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setStatusMessage(t("formError"));
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
            <h1>{t("contactZaglavie")}</h1>
            <div className="contact-container">
                <div className="contact-info-section">
                    <h1>{t("contactTitle")}</h1>
                    <div className="contact-info">
                        <p>
                            <a
                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${aboutData.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-icon"
                            >
                                <i className="fas fa-envelope"></i> {t("email")}
                            </a>
                        </p>
                        <p>
                            <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-icon">
                                <i className="fab fa-linkedin"></i> {t("linkedin")}
                            </a>
                        </p>
                    </div>

                </div>

                {/* Contact Form */}
                <div className="contact-form-section">
                    <h1>{t("infoTitle")}</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            {t("formSubject")}:
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            {t("formName")}:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            {t("formEmail")}:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            {t("formMessage")}:
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </label>
                        <button type="submit" disabled={isSending}>
                            {isSending ? t("formSending") : t("formSend")}
                        </button>
                    </form>
                    {statusMessage && <p className="status-message">{statusMessage}</p>} {/* ✅ Show status message */}
                </div>
            </div>
        </div>
    );
};

export default Contact;
