package com.ivanov.portfolio_final.about.presentationlayer;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AboutResponseDTO {

    private String aboutId;
    private String image;
    private String description;
    private String languages;
}
