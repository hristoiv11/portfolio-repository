package com.ivanov.portfolio_final.experience.businesslayer;

import com.ivanov.portfolio_final.experience.dataaccesslayer.Experience;
import com.ivanov.portfolio_final.experience.presentationlayer.ExperienceRequestDTO;
import com.ivanov.portfolio_final.experience.presentationlayer.ExperienceResponseDTO;

import java.util.List;

public interface ExperienceService {

    List<ExperienceResponseDTO> getAllExperiences();

    ExperienceResponseDTO getExperienceByExperienceID(String experienceId);

    ExperienceResponseDTO addExperience(ExperienceRequestDTO experienceRequestDTO);

    ExperienceResponseDTO updateExperience(ExperienceRequestDTO experienceRequestDTO, String experienceId);

    void deleteExperience(String experienceId);

    Experience getExperienceImageByExperienceID(String experienceId);
}
