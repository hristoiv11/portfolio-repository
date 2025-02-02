package com.ivanov.portfolio_final.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /*
    @Override
    public void sendEmail(String email, String name, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("hristogr85@gmail.com"); // ✅ Change this to your actual Gmail
        mailMessage.setSubject("New Contact Message from " + name + " - " + subject);
        mailMessage.setText("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);

        // ✅ Set Reply-To so you can reply directly to the sender
        mailMessage.setReplyTo(email);

        mailSender.send(mailMessage);
    }

     */

    @Override
    public void sendEmail(String email, String name, String subject, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo("hristogr85@gmail.com");
            helper.setReplyTo(email);

            boolean isReview = subject.toLowerCase().contains("review");

            if (isReview) {

                long reviewId = extractReviewId(message);
                int rating = extractRating(message);
                String reviewMessage = extractReviewMessage(message);

                helper.setSubject("New Review Submission from " + name);

                String htmlContent = String.format(
                        """
                        <html>
                        <body>
                            <p><strong>Name:</strong> %s</p>
                            <p><strong>Rating:</strong> %d</p>
                            <p><strong>Message:</strong></p>
                            <blockquote>%s</blockquote>
                            <br>
                            <p>
                                <a href="http://localhost:8080/api/reviews/approve/%d" 
                                   style="display:inline-block; padding:12px 20px; font-size:14px; 
                                          font-weight:bold; color:white; background-color:#28a745; 
                                          text-decoration:none; border-radius:5px;">
                                    ✅ Approve
                                </a>
                                &nbsp;
                                <a href="http://localhost:8080/api/reviews/reject/%d" 
                                   style="display:inline-block; padding:12px 20px; font-size:14px; 
                                          font-weight:bold; color:white; background-color:#dc3545; 
                                          text-decoration:none; border-radius:5px;">
                                    ❌ Reject
                                </a>
                            </p>
                        
                        </body>
                        </html>
                        """,
                        name, rating, reviewMessage, reviewId, reviewId
                );

                helper.setText(htmlContent, true);

            } else {

                helper.setSubject("New Contact Message from " + name + " - " + subject);
                String plainText = String.format(
                        "Name: %s\nEmail: %s\n\nMessage:\n%s",
                        name, email, message
                );
                helper.setText(plainText, false);
            }

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }


    private long extractReviewId(String message) {
        Pattern pattern = Pattern.compile("approve/(\\d+)");
        Matcher matcher = pattern.matcher(message);
        if (matcher.find()) {
            return Long.parseLong(matcher.group(1));
        }
        return -1;
    }

    private int extractRating(String message) {
        Pattern pattern = Pattern.compile("Rating:\\s*(\\d+)");
        Matcher matcher = pattern.matcher(message);
        if (matcher.find()) {
            return Integer.parseInt(matcher.group(1));
        }
        return 0;
    }

    private String extractReviewMessage(String message) {

        Pattern pattern = Pattern.compile("Message:\\s*(.*?)\\s*(To approve.*|To reject.*)?$", Pattern.DOTALL);
        Matcher matcher = pattern.matcher(message);

        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "No message provided.";
    }

}
