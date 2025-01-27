import React, { useState, useEffect } from 'react';
import "../App.css";

interface Review {
    name: string;
    message: string;
    rating: number; // Add rating property
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [name, setName] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [rating, setRating] = useState<number>(0); // State for star rating

    useEffect(() => {
        const savedReviews = localStorage.getItem('reviews');
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }, [reviews]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && message.trim() && rating > 0) {
            const newReview: Review = { name, message, rating };
            setReviews([...reviews, newReview]);
            setName('');
            setMessage('');
            setRating(0);
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
                        <button type="submit">Submit</button>
                    </form>
                </div>

                {/* Display Reviews */}
                <div className="review-list">
                    <h2>What People Say</h2>
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index} className="review-item">
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
                </div>
            </div>
        </div>
    );
};

export default Reviews;
