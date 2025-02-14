package com.ivanov.portfolio_final.projects.presentationlayer;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectRequestDTO {


    private String nameEn;
    private String nameFr;
    private String descriptionEn;
    private String descriptionFr;
    private String technologies;
    private String link;
    private String image;
}
