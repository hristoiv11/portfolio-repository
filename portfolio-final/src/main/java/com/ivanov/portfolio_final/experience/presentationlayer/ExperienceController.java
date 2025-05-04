package com.ivanov.portfolio_final.experience.presentationlayer;


import com.ivanov.portfolio_final.experience.businesslayer.ExperienceService;
import com.ivanov.portfolio_final.experience.dataaccesslayer.Experience;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {

    private ExperienceService experienceService;

    public ExperienceController(ExperienceService experienceService) {

        this.experienceService=experienceService;
    }

    @GetMapping()
    public ResponseEntity<List<ExperienceResponseDTO>> getExperiences(){

        return ResponseEntity.status(HttpStatus.OK).body(experienceService.getAllExperiences());
    }

    @GetMapping("/{experienceId}")
    public ResponseEntity<ExperienceResponseDTO> getExperienceByExperienceID(@PathVariable String experienceId,
                                                                    @RequestParam(defaultValue = "en") String lang) {
        ExperienceResponseDTO experience = experienceService.getExperienceByExperienceID(experienceId);

        if (experience == null) {
            throw new NotFoundException("Experience data not found for ID: " + experienceId);
        }

        // Select the appropriate description based on the requested language
        String companyName = "fr".equalsIgnoreCase(lang) ? experience.getCompanyNameFr() : experience.getCompanyNameEn();
        String positionTitle = "fr".equalsIgnoreCase(lang) ? experience.getPositionTitleFr() : experience.getPositionTitleEn();
        String description = "fr".equalsIgnoreCase(lang) ? experience.getDescriptionFr() : experience.getDescriptionEn();
        String city = "fr".equalsIgnoreCase(lang) ? experience.getCityFr() : experience.getCityEn();
        String country = "fr".equalsIgnoreCase(lang) ? experience.getCountryFr() : experience.getCountryEn();
        String type = "fr".equalsIgnoreCase(lang) ? experience.getTypeFr() : experience.getTypeEn();

        // Construct and return the response using the constructor
        ExperienceResponseDTO response = new ExperienceResponseDTO(
                experience.getExperienceId(),
                experience.getCompanyNameEn(),
                experience.getCompanyNameFr(),
                experience.getPositionTitleEn(),
                experience.getPositionTitleFr(),
                experience.getDescriptionEn(),
                experience.getDescriptionFr(),
                experience.getCityEn(),
                experience.getCityFr(),
                experience.getCountryEn(),
                experience.getCountryFr(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.getTechnologies(),
                experience.getImage(),
                experience.getTypeEn(),
                experience.getTypeFr()
        );

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping()
    public ResponseEntity<ExperienceResponseDTO> addExperience(@RequestBody ExperienceRequestDTO experienceRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(experienceService.addExperience(experienceRequestDTO));
    }

    @PutMapping("/{experienceId}")
    public ResponseEntity<ExperienceResponseDTO> updateExperience(@RequestBody ExperienceRequestDTO experienceRequestDTO,
                                                            @PathVariable String experienceId,
                                                            @RequestParam(defaultValue = "en") String lang) {
        try {
            ExperienceResponseDTO currentExperience = experienceService.getExperienceByExperienceID(experienceId);
            if (currentExperience == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            // Update only the requested language description
            String newCompanyNameEn = currentExperience.getCompanyNameEn();
            String newCompanyNameFr = currentExperience.getCompanyNameFr();
            String newPositionTitleEn = currentExperience.getPositionTitleEn();
            String newPositionTitleFr = currentExperience.getPositionTitleFr();
            String newDescriptionEn = currentExperience.getDescriptionEn();
            String newDescriptionFr = currentExperience.getDescriptionFr();
            String newCityEn = currentExperience.getCityEn();
            String newCityFr = currentExperience.getCityFr();
            String newCountryEn = currentExperience.getCountryEn();
            String newCountryFr = currentExperience.getCountryFr();
            String newTypeEn = currentExperience.getTypeEn();
            String newTypeFr = currentExperience.getTypeFr();


            if ("fr".equalsIgnoreCase(lang)) {
                newCompanyNameFr = experienceRequestDTO.getCompanyNameFr();
                newPositionTitleFr = experienceRequestDTO.getPositionTitleFr();
                newDescriptionFr = experienceRequestDTO.getDescriptionFr();
                newCityFr = experienceRequestDTO.getCityFr();
                newCountryFr = experienceRequestDTO.getCountryFr();
                newTypeFr = currentExperience.getTypeFr();
            } else {
                newCompanyNameEn = experienceRequestDTO.getCompanyNameEn();
                newPositionTitleEn = experienceRequestDTO.getPositionTitleEn();
                newDescriptionEn = experienceRequestDTO.getDescriptionEn();
                newCityEn = experienceRequestDTO.getCityEn();
                newCountryEn = experienceRequestDTO.getCountryEn();
                newTypeEn = currentExperience.getTypeEn();
            }

            ExperienceResponseDTO updatedExperience = experienceService.updateExperience(experienceRequestDTO, experienceId);

            return ResponseEntity.status(HttpStatus.OK).body(updatedExperience);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{experienceId}")
    public ResponseEntity<Void> deleteExperience(@PathVariable String experienceId){

        experienceService.deleteExperience(experienceId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

    }

    @GetMapping("/{experienceId}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable String experienceId) {
        Experience experience = experienceService.getExperienceImageByExperienceID(experienceId); // Using the service layer for better encapsulation
        if (experience == null || experience.getImage() == null) {
            throw new NotFoundException("Image not found for experienceId: " + experienceId);
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust MIME type if needed
                .body(Base64.getDecoder().decode(experience.getImage())); // If image is Base64 encoded, decode it
    }
}
