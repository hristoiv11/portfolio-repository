package com.ivanov.portfolio_final.skills.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SkillResponseDTO {

    private String skillId;
    private String languages;
    private String frameworks;
    private String tools;
    private String databaseTechnologies;
    private String methodologies;
}
