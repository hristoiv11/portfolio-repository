package com.ivanov.portfolio_final.reviews;

import java.util.List;

public interface ReviewService {
    void submitReview(ReviewRequestDTO reviewRequest);
    List<ReviewResponseDTO> getApprovedReviews();
    List<ReviewResponseDTO> getPendingReviews();
    void approveReview(Long id);
    void rejectReview(Long id);
    void deleteReview(Long id);

}
