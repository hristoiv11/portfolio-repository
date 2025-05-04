package com.ivanov.portfolio_final.experience.presentationlayer;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceResponseDTO {


    private String experienceId;
    private String companyNameEn;
    private String companyNameFr;
    private String positionTitleEn;
    private String positionTitleFr;
    private String descriptionEn;
    private String descriptionFr;
    private String cityEn;
    private String cityFr;
    private String countryEn;
    private String countryFr;
    private LocalDate startDate;
    private LocalDate endDate;
    private String technologies;
    private String image;
    private String typeEn;
    private String typeFr;
}
