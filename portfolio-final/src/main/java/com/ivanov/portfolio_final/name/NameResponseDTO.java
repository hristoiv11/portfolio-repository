package com.ivanov.portfolio_final.name;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NameResponseDTO {

    private Long id; // Unique identifier for the item
    private String name;
    private String lastName;
}
