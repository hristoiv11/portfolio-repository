package com.ivanov.portfolio_final.reviews;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewResponseDTO {
    private Long id;
    private String name;
    private String message;
    private int rating;

    public ReviewResponseDTO(Review review) {
        this.id = review.getId();
        this.name = review.getName();
        this.message = review.getMessage();
        this.rating = review.getRating();
    }
}
