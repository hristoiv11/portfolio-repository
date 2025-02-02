package com.ivanov.portfolio_final.reviews;

import com.ivanov.portfolio_final.email.EmailService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final EmailService emailService;

    public ReviewServiceImpl(ReviewRepository reviewRepository, EmailService emailService) {
        this.reviewRepository = reviewRepository;
        this.emailService = emailService;
    }

    /*
    @Override
    public void submitReview(ReviewRequestDTO reviewRequest) {
        Review review = new Review();
        review.setName(reviewRequest.getName());
        review.setMessage(reviewRequest.getMessage());
        review.setRating(reviewRequest.getRating());
        review.setApproved(false);

        review = reviewRepository.save(review); // ✅ Ensure ID is generated before email is sent

        // ✅ Modify email to use GET requests for approval/rejection
        String subject = "New Review Submission from " + review.getName();
        String emailBody = "Name: " + review.getName() +
                "\nRating: " + review.getRating() +
                "\n\nMessage:\n" + review.getMessage() +
                "\n\nTo approve, click: http://localhost:8080/api/reviews/approve/" + review.getId() +
                "\nTo reject, click: http://localhost:8080/api/reviews/reject/" + review.getId();

        emailService.sendEmail("hristogr85@gmail.com", review.getName(), subject, emailBody);
    }

     */

    @Override
    public void submitReview(ReviewRequestDTO reviewRequest) {
        Review review = new Review();
        review.setName(reviewRequest.getName());
        review.setMessage(reviewRequest.getMessage());
        review.setRating(reviewRequest.getRating());
        review.setApproved(false);

        reviewRepository.save(review);

        // ✅ New Email Formatting
        String subject = "New Review Submission from " + review.getName();
        String emailBody = String.format(
                """
                New Review Submission from %s
                
                Name: %s
                Rating: %d
                
                Message:
                %s
                
                To approve, click: <a href="http://localhost:8080/api/reviews/approve/%d">Approve ✅</a>
                <br>
                To reject, click: <a href="http://localhost:8080/api/reviews/reject/%d">Reject ❌</a>
                """,
                review.getName(), review.getName(), review.getRating(), review.getMessage(), review.getId(), review.getId()
        );

        emailService.sendEmail("hristogr85@gmail.com", review.getName(), subject, emailBody);
    }




    @Override
    public List<ReviewResponseDTO> getApprovedReviews() {
        return reviewRepository.findByApprovedTrue()
                .stream()
                .map(ReviewResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponseDTO> getPendingReviews() {
        return reviewRepository.findByApprovedFalse()
                .stream()
                .map(ReviewResponseDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    public void approveReview(Long id) {
        reviewRepository.findById(id).ifPresent(review -> {
            review.setApproved(true);
            reviewRepository.save(review);
        });
    }

    @Override
    public void rejectReview(Long id) {
        reviewRepository.findById(id).ifPresent(review -> {
            reviewRepository.deleteById(id);
        });
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.findById(id).ifPresent(review -> {
            reviewRepository.deleteById(id);
        });
    }


}
