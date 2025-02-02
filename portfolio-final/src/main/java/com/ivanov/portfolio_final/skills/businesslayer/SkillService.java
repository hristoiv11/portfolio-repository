package com.ivanov.portfolio_final.skills.businesslayer;

import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectRequestDTO;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectResponseDTO;
import com.ivanov.portfolio_final.skills.presentationlayer.SkillRequestDTO;
import com.ivanov.portfolio_final.skills.presentationlayer.SkillResponseDTO;

import java.util.List;

public interface SkillService {

    List<SkillResponseDTO> getAllSkills();

    SkillResponseDTO getSkillBySkillID(String skillId);

    SkillResponseDTO addSkill(SkillRequestDTO skillRequestDTO);

    SkillResponseDTO updateSkill(SkillRequestDTO skillRequestDTO, String skillId);

    void deleteSkill(String skillId);

}
