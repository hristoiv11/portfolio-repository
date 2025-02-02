import React, { useState, useEffect } from 'react';
import "../App.css";

interface Review {
    id: number;
    name: string;
    message: string;
    rating: number;
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Function to fetch approved reviews
    const fetchReviews = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/reviews/approved");
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

    // ✅ Handle review submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMessage(null);

        if (!name.trim() || !message.trim() || rating === 0) {
            setStatusMessage("❌ Please fill out all fields and select a rating.");
            setIsSubmitting(false);
            return;
        }

        const reviewData = { name, message, rating };

        try {
            const response = await fetch("http://localhost:8080/api/reviews/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                setStatusMessage("✅ Review submitted!");
                setName('');
                setMessage('');
                setRating(0);

                setTimeout(() => setStatusMessage(null), 3000);
            } else {
                setStatusMessage("❌ Failed to submit review. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setStatusMessage("❌ Error: Could not submit review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="reviews-page">
            <h1>Reviews</h1>
            <div className="review-container">
                {/* Review Form */}
                <div className="review-form">
                    <h2>Leave a Review</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            required
                        />
                        <label>Rating:</label>
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
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                    </form>
                    {statusMessage && <p className="status-message">{statusMessage}</p>}
                </div>

                {/* Display Approved Reviews */}
                <div className="review-list">
                    <h2>What People Say</h2>
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
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No approved reviews yet. Be the first to leave a review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;