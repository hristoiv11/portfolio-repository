package com.ivanov.portfolio_final.contact;

import com.ivanov.portfolio_final.email.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {
    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendContactEmail(@RequestBody ContactRequestDTO request) {
        emailService.sendEmail(request.getEmail(), request.getName(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Email sent successfully!");
    }
}
