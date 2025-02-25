package com.ivanov.portfolio_final.projects.businesslayer;

import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import com.ivanov.portfolio_final.projects.dataaccesslayer.ProjectRepository;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectRequestDTO;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectResponseDTO;
import com.ivanov.portfolio_final.utils.exceptions.InUseException;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository){

        this.projectRepository=projectRepository;
    }

    @Override
    public List<ProjectResponseDTO> getAllProjects() {

        List<Project> projectEntities = projectRepository.findAll();


        List<ProjectResponseDTO> projectResponseDTOList = new ArrayList<>();

        for(Project project : projectEntities){
            ProjectResponseDTO projectResponseDTO = new ProjectResponseDTO();
            BeanUtils.copyProperties(project, projectResponseDTO);

            projectResponseDTOList.add(projectResponseDTO);
        }

        return projectResponseDTOList;
    }

    @Override
    public ProjectResponseDTO getProjectByProjectID(String projectId) {
        Project project = projectRepository.findProjectByProjectId(projectId);

        if (project == null) {
            throw new NotFoundException("Unknown projectId: " + projectId);
        }

        return new ProjectResponseDTO(
                project.getProjectId(),
                project.getNameEn(),
                project.getNameFr(),
                project.getDescriptionEn(),
                project.getDescriptionFr(),
                project.getTechnologies(),
                project.getLink(),
                project.getImage()
        );
    }


    @Override
    public ProjectResponseDTO addProject(ProjectRequestDTO projectRequestDTO) {
        Project project = new Project();

        project.setProjectId(UUID.randomUUID().toString());

        // ✅ Ensure both English and French names & descriptions are saved
        project.setNameEn(projectRequestDTO.getNameEn() != null ? projectRequestDTO.getNameEn() : projectRequestDTO.getNameFr());
        project.setNameFr(projectRequestDTO.getNameFr() != null ? projectRequestDTO.getNameFr() : projectRequestDTO.getNameEn());
        project.setDescriptionEn(projectRequestDTO.getDescriptionEn() != null ? projectRequestDTO.getDescriptionEn() : projectRequestDTO.getDescriptionFr());
        project.setDescriptionFr(projectRequestDTO.getDescriptionFr() != null ? projectRequestDTO.getDescriptionFr() : projectRequestDTO.getDescriptionEn());

        project.setTechnologies(projectRequestDTO.getTechnologies());
        project.setLink(projectRequestDTO.getLink());
        project.setImage(projectRequestDTO.getImage());

        Project savedProject = projectRepository.save(project);

        return new ProjectResponseDTO(
                savedProject.getProjectId(),
                savedProject.getNameEn(),
                savedProject.getNameFr(),
                savedProject.getDescriptionEn(),
                savedProject.getDescriptionFr(),
                savedProject.getTechnologies(),
                savedProject.getLink(),
                savedProject.getImage()
        );
    }



    /*
    @Override
    public ProjectResponseDTO updateProject(ProjectRequestDTO projectRequestDTO, String projectId) {

        Project foundProject = projectRepository.findProjectByProjectId(projectId);

        if(foundProject == null){
            throw new NotFoundException("Unknown projectId: " + projectId);
        }

        Project project = new Project();
        BeanUtils.copyProperties(projectRequestDTO,project);

        project.setProjectId(foundProject.getProjectId());
        project.setId(foundProject.getId());

        Project savedProject = projectRepository.save(project);

        ProjectResponseDTO projectResponseDTO = new ProjectResponseDTO();
        BeanUtils.copyProperties(savedProject,projectResponseDTO);

        return projectResponseDTO;
    }

     */

    @Override
    public ProjectResponseDTO updateProject(ProjectRequestDTO projectRequestDTO, String projectId) {
        Project foundProject = projectRepository.findProjectByProjectId(projectId);

        if (foundProject == null) {
            throw new NotFoundException("Unknown projectId: " + projectId);
        }

        // Update fields only if they are provided
        if (projectRequestDTO.getNameEn() != null) {
            foundProject.setNameEn(projectRequestDTO.getNameEn());
        }
        if (projectRequestDTO.getNameFr() != null) {
            foundProject.setNameFr(projectRequestDTO.getNameFr());
        }
        if (projectRequestDTO.getDescriptionEn() != null) {
            foundProject.setDescriptionEn(projectRequestDTO.getDescriptionEn());
        }
        if (projectRequestDTO.getDescriptionFr() != null) {
            foundProject.setDescriptionFr(projectRequestDTO.getDescriptionFr());
        }
        if (projectRequestDTO.getTechnologies() != null) {
            foundProject.setTechnologies(projectRequestDTO.getTechnologies());
        }
        if (projectRequestDTO.getLink() != null) {
            foundProject.setLink(projectRequestDTO.getLink());
        }
        if (projectRequestDTO.getImage() != null) {
            foundProject.setImage(projectRequestDTO.getImage());
        }

        Project savedProject = projectRepository.save(foundProject);

        return new ProjectResponseDTO(
                savedProject.getProjectId(),
                savedProject.getNameEn(),
                savedProject.getNameFr(),
                savedProject.getDescriptionEn(),
                savedProject.getDescriptionFr(),
                savedProject.getTechnologies(),
                savedProject.getLink(),
                savedProject.getImage()
        );
    }


    @Override
    public void deleteProject(String projectId) {
        Project foundProject = projectRepository.findProjectByProjectId(projectId);

        if(foundProject == null){
            throw new NotFoundException("Unknown projectId: " + projectId);
        }

        try{
            projectRepository.delete(foundProject);

        }catch(DataIntegrityViolationException ex){

            throw new InUseException("Cannot delete project with projectId:" + projectId);

        }
    }

    @Override
    public Project getProjectImageByProjectID(String projectId) {
        Project project = projectRepository.findProjectByProjectId(projectId);
        if (project == null) {
            throw new NotFoundException("Unknown projectId: " + projectId);
        }
        return project;
    }

}
