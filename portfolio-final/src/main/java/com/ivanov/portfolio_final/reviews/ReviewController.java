package com.ivanov.portfolio_final.reviews;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/submit")
    public ResponseEntity<String> submitReview(@Valid @RequestBody ReviewRequestDTO reviewRequest) {
        reviewService.submitReview(reviewRequest);
        return ResponseEntity.ok("Review submitted for approval!");
    }

    @GetMapping("/approved")
    public ResponseEntity<List<ReviewResponseDTO>> getApprovedReviews() {
        return ResponseEntity.ok(reviewService.getApprovedReviews());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ReviewResponseDTO>> getPendingReviews() {
        return ResponseEntity.ok(reviewService.getPendingReviews());
    }


    @GetMapping("/approve/{id}")
    public ResponseEntity<String> approveReview(@PathVariable Long id) {
        reviewService.approveReview(id);
        return ResponseEntity.ok("Review approved! It will now be displayed on your website.");
    }

    @GetMapping("/reject/{id}")
    public ResponseEntity<String> rejectReview(@PathVariable Long id) {
        reviewService.rejectReview(id);
        return ResponseEntity.ok("Review rejected! It will not be displayed.");
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
