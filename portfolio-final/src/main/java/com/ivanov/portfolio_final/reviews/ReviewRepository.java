package com.ivanov.portfolio_final.reviews;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByApprovedTrue();
    List<Review> findByApprovedFalse();
}
