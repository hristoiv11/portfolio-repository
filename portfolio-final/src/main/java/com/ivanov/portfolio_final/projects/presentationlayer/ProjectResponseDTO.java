package com.ivanov.portfolio_final.projects.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseDTO {

    private String projectId;
    private String name;
    private String descriptionEn;
    private String descriptionFr;
    private String technologies;
    private String link;
    private String image;
}
