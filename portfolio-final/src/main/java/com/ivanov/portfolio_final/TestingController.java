package com.ivanov.portfolio_final;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TestingController {

    @GetMapping("/api/hello")
    public String sayHello() {
        return "Hello Hristo";
    }
}
