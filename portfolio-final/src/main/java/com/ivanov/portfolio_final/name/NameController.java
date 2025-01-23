package com.ivanov.portfolio_final.name;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/names")
@CrossOrigin(origins = "http://localhost:5173")
public class NameController {

    private final NameService nameService;

    public NameController(NameService nameService) {
        this.nameService = nameService;
    }

    @GetMapping
    public List<NameResponseDTO> getAllNames() {
        return nameService.getAllNames();
    }
}
