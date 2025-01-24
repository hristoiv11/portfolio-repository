package com.ivanov.portfolio_final.projects.businesslayer;

import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectRequestDTO;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectResponseDTO;

import java.util.List;

public interface ProjectService {

    List<ProjectResponseDTO> getAllProjects();

    ProjectResponseDTO getProjectByProjectID(String projectId);

    ProjectResponseDTO addProject(ProjectRequestDTO projectRequestDTO);

    ProjectResponseDTO updateProject(ProjectRequestDTO projectRequestDTO, String projectId);

    void deleteProject(String projectId);

    Project getProjectImageByProjectID(String projectId);

}
