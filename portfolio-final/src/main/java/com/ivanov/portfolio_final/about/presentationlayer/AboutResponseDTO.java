package com.ivanov.portfolio_final.about.presentationlayer;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AboutResponseDTO {

    private String aboutId;
    private String image;
    private String descriptionEn;
    private String descriptionFr;
    private String languages;
    private String flags;
}
