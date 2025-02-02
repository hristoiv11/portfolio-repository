package com.ivanov.portfolio_final.reviews;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewRequestDTO {
    private String name;
    private String message;
    private int rating;
}
