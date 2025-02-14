package com.ivanov.portfolio_final.projects.presentationlayer;

import com.ivanov.portfolio_final.projects.businesslayer.ProjectService;
import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    private ProjectService projectService;

    public ProjectController(ProjectService projectService) {

        this.projectService=projectService;
    }

    @GetMapping()
    public ResponseEntity<List<ProjectResponseDTO>> getProjects(){

        return ResponseEntity.status(HttpStatus.OK).body(projectService.getAllProjects());
    }

    /*
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> getProjectByProjectID(@PathVariable String projectId){

        return ResponseEntity.status(HttpStatus.OK).body(projectService.getProjectByProjectID(projectId));
    }

     */

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> getProjectByProjectID(@PathVariable String projectId,
                                                                    @RequestParam(defaultValue = "en") String lang) {
        ProjectResponseDTO project = projectService.getProjectByProjectID(projectId);

        if (project == null) {
            throw new NotFoundException("Project data not found for ID: " + projectId);
        }

        // Select the appropriate description based on the requested language
        String description = "fr".equalsIgnoreCase(lang) ? project.getDescriptionFr() : project.getDescriptionEn();

        // Construct and return the response using the constructor
        ProjectResponseDTO response = new ProjectResponseDTO(
                project.getProjectId(),
                project.getNameEn(),
                project.getNameFr(),
                project.getDescriptionEn(),
                project.getDescriptionFr(),
                project.getTechnologies(),
                project.getLink(),
                project.getImage()
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping()
    public ResponseEntity<ProjectResponseDTO> addProject(@RequestBody ProjectRequestDTO projectRequestDTO) {

        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.addProject(projectRequestDTO));
    }

    /*
    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@RequestBody ProjectRequestDTO projectRequestDTO,
                                                            @PathVariable String projectId){
        try{
            ProjectResponseDTO updateProject = projectService.updateProject(projectRequestDTO,projectId);
            return ResponseEntity.status(HttpStatus.OK).body(updateProject);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

     */

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@RequestBody ProjectRequestDTO projectRequestDTO,
                                                            @PathVariable String projectId,
                                                            @RequestParam(defaultValue = "en") String lang) {
        try {
            ProjectResponseDTO currentProject = projectService.getProjectByProjectID(projectId);
            if (currentProject == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Update only the requested language description
            String newNameEn = currentProject.getNameEn();
            String newNameFr = currentProject.getNameFr();
            String newDescriptionEn = currentProject.getDescriptionEn();
            String newDescriptionFr = currentProject.getDescriptionFr();

            if ("fr".equalsIgnoreCase(lang)) {
                newNameFr = projectRequestDTO.getNameFr();
                newDescriptionFr = projectRequestDTO.getDescriptionFr(); // Update French description
            } else {
                newNameEn = projectRequestDTO.getNameEn();
                newDescriptionEn = projectRequestDTO.getDescriptionEn(); // Update English description
            }

            ProjectResponseDTO updatedProject = projectService.updateProject(projectRequestDTO, projectId);

            return ResponseEntity.status(HttpStatus.OK).body(updatedProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable String projectId){

        projectService.deleteProject(projectId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

    }

    @GetMapping("/{projectId}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable String projectId) {
        Project project = projectService.getProjectImageByProjectID(projectId); // Using the service layer for better encapsulation
        if (project == null || project.getImage() == null) {
            throw new NotFoundException("Image not found for projectId: " + projectId);
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust MIME type if needed
                .body(Base64.getDecoder().decode(project.getImage())); // If image is Base64 encoded, decode it
    }

}
