package com.ivanov.portfolio_final;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ItemResponseDTO {
    private Long id; // Unique identifier for the item
    private String name; // Name of the item
    private String description; // Description of the item
}
