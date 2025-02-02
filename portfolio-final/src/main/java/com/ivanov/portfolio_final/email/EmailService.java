package com.ivanov.portfolio_final.email;

public interface EmailService {

    void sendEmail(String email, String name, String subject, String message);
}