import React, { useState, useEffect } from 'react';
import "../App.css";
import {useTranslation} from "react-i18next";

interface Review {
    id: number;
    name: string;
    message: string;
    rating: number;
}

const Reviews: React.FC = () => {
    const { t} = useTranslation();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);


    const reviewsBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Reviews Backend URL:", reviewsBackendUrl);
    const fetchReviews = async () => {

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token); // Admin if token exists

        const reviewsUrl = `${reviewsBackendUrl}api/reviews/approved`;
        console.log("Fetching reviews from:", reviewsUrl);

        try {
            const response = await fetch(reviewsUrl);
            if (!response.ok) throw new Error("Failed to fetch reviews");
            const data: Review[] = await response.json();
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    // ✅ Fetch reviews immediately & set interval for auto-refresh
    useEffect(() => {
        fetchReviews(); // Fetch immediately when component mounts

        const interval = setInterval(fetchReviews, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const subBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Reviews Backend URL:", subBackendUrl);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage(null);

        if (!name.trim() || !message.trim() || rating === 0) {
            setStatusMessage(t("emptyFields"));
            setIsSubmitting(false);
            return;
        }

        const reviewData = { name, message, rating };

        const submitReviewUrl = `${reviewsBackendUrl}api/reviews/submit`;
        console.log("Submitting review to:", submitReviewUrl);

        try {
            const response = await fetch(submitReviewUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                setStatusMessage(t("reviewSuccess"));
                setName('');
                setMessage('');
                setRating(0);

                setTimeout(() => setStatusMessage(null), 3000);
            } else {
                setStatusMessage(t("reviewFailure"));
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setStatusMessage(t("reviewError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (reviewId: number) => {
        setDeleteReviewId(reviewId);
        setShowDeleteSuccess(false); // Reset success message
    };

    /*
    const handleDeleteReview = async (reviewId: number) => {
        if (!isAdmin) return;

        try {
            const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });

            if (response.ok) {
                setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

     */

    const delBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Reviews Backend URL:", delBackendUrl);
    const confirmDeleteReview = async () => {
        if (!deleteReviewId) return;

        const deleteReviewUrl = `${reviewsBackendUrl}api/reviews/${deleteReviewId}`;
        console.log("Deleting review from:", deleteReviewUrl);

        try {
            const response = await fetch(deleteReviewUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });

            if (response.ok) {
                setReviews((prevReviews) => prevReviews.filter((review) => review.id !== deleteReviewId));
                setShowDeleteSuccess(true); // Show success message
                setTimeout(() => {
                    setShowDeleteSuccess(false);
                    setDeleteReviewId(null); // Close modal
                }, 2000); // Auto-hide after 2 seconds
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };




    return (
        <div className="reviews-page">
            <h1>{t("reviewsTitle")}</h1>
            <div className="review-container">
                {/* Review Form */}
                <div className="review-form">
                    <h2>{t("leaveReviewPage")}</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">{t("name")}:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("namePlaceholder")}
                            required
                        />
                        <label htmlFor="message">{t("message")}:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t("messagePlaceholder")}
                            required
                        />
                        <label>{t("rating")}:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={star <= rating ? 'filled-star' : 'empty-star'}
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? t("submitting") : t("submitReview")}
                        </button>
                    </form>
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                </div>

                {/* Display Approved Reviews */}
                <div className="review-list">
                    <h2>{t("reviewListTitle")}</h2>
                    {reviews.length > 0 ? (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id} className="review-item">
                                    <p>"{review.message}"</p>
                                    <h3>- {review.name}</h3>
                                    <p>
                                        <span className="star-display">
                                            {'★'.repeat(review.rating)}
                                            {'☆'.repeat(5 - review.rating)}
                                        </span>
                                    </p>

                                    {isAdmin && (
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteClick(review.id)}
                                        >
                                            {t("deleteReview")}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{t("noReviews")}</p>
                    )}

                    {deleteReviewId !== null && (
                        <div className="review-modal-overlay">
                            <div className="review-modal">
                                {!showDeleteSuccess ? (
                                    <>
                                        <h2>{t("confirmDelete")}</h2>
                                        <p>{t("confirmDelete")}</p>
                                        <button className="review-btn-delete" onClick={confirmDeleteReview}>
                                            {t("yesDelete")}
                                        </button>
                                        <button className="review-btn-cancel" onClick={() => setDeleteReviewId(null)}>
                                            {t("cancel")}
                                        </button>
                                    </>
                                ) : (
                                    <h2>{t("deleteSuccess")}</h2>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;