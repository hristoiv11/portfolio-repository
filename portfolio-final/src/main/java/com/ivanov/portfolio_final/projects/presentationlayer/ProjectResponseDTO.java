package com.ivanov.portfolio_final.projects.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectResponseDTO {

    private String projectId;
    private String name;
    private String description;
    private String technologies;
    private String link;
    private String image;
}
