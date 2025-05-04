package com.ivanov.portfolio_final.experience.businesslayer;

import com.ivanov.portfolio_final.experience.dataaccesslayer.Experience;
import com.ivanov.portfolio_final.experience.dataaccesslayer.ExperienceRepository;
import com.ivanov.portfolio_final.experience.presentationlayer.ExperienceRequestDTO;
import com.ivanov.portfolio_final.experience.presentationlayer.ExperienceResponseDTO;
import com.ivanov.portfolio_final.utils.exceptions.InUseException;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ExperienceServiceImpl implements ExperienceService{

    private ExperienceRepository experienceRepository;

    public ExperienceServiceImpl(ExperienceRepository experienceRepository){

        this.experienceRepository=experienceRepository;
    }

    @Override
    public List<ExperienceResponseDTO> getAllExperiences() {

        List<Experience> experiencesEntities = experienceRepository.findAll();


        List<ExperienceResponseDTO> experienceResponseDTOList = new ArrayList<>();

        for(Experience experience : experiencesEntities){
            ExperienceResponseDTO experienceResponseDTO = new ExperienceResponseDTO();
            BeanUtils.copyProperties(experience, experienceResponseDTO);

            experienceResponseDTOList.add(experienceResponseDTO);
        }

        return experienceResponseDTOList;
    }

    @Override
    public ExperienceResponseDTO getExperienceByExperienceID(String experienceId) {
        Experience experience = experienceRepository.findExperienceByExperienceId(experienceId);

        if (experience == null) {
            throw new NotFoundException("Unknown experienceId: " + experienceId);
        }

        return new ExperienceResponseDTO(
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
    }


    @Override
    public ExperienceResponseDTO addExperience(ExperienceRequestDTO experienceRequestDTO) {
        Experience experience = new Experience();

        experience.setExperienceId(UUID.randomUUID().toString());

        // ✅ Ensure both English and French names & descriptions are saved
        experience.setCompanyNameEn(experienceRequestDTO.getCompanyNameEn() != null ? experienceRequestDTO.getCompanyNameEn() : experienceRequestDTO.getCompanyNameFr());
        experience.setCompanyNameFr(experienceRequestDTO.getCompanyNameFr() != null ? experienceRequestDTO.getCompanyNameFr() : experienceRequestDTO.getCompanyNameEn());

        experience.setPositionTitleEn(experienceRequestDTO.getPositionTitleEn() != null ? experienceRequestDTO.getPositionTitleEn() : experienceRequestDTO.getPositionTitleFr());
        experience.setPositionTitleFr(experienceRequestDTO.getPositionTitleFr() != null ? experienceRequestDTO.getPositionTitleFr() : experienceRequestDTO.getPositionTitleEn());

        experience.setDescriptionEn(experienceRequestDTO.getDescriptionEn() != null ? experienceRequestDTO.getDescriptionEn() : experienceRequestDTO.getDescriptionFr());
        experience.setDescriptionFr(experienceRequestDTO.getDescriptionFr() != null ? experienceRequestDTO.getDescriptionFr() : experienceRequestDTO.getDescriptionEn());

        experience.setCityEn(experienceRequestDTO.getCityEn() != null ? experienceRequestDTO.getCityEn() : experienceRequestDTO.getCityFr());
        experience.setCityFr(experienceRequestDTO.getCityFr() != null ? experienceRequestDTO.getCityFr() : experienceRequestDTO.getCityEn());

        experience.setCountryEn(experienceRequestDTO.getCountryEn() != null ? experienceRequestDTO.getCountryEn() : experienceRequestDTO.getCountryFr());
        experience.setCountryFr(experienceRequestDTO.getCountryFr() != null ? experienceRequestDTO.getCountryFr() : experienceRequestDTO.getCountryEn());

        experience.setStartDate(experienceRequestDTO.getStartDate());
        experience.setEndDate(experienceRequestDTO.getEndDate());
        experience.setTechnologies(experienceRequestDTO.getTechnologies());
        experience.setImage(experienceRequestDTO.getImage());

        experience.setTypeEn(experienceRequestDTO.getTypeEn() != null ? experienceRequestDTO.getTypeEn() : experienceRequestDTO.getTypeFr());
        experience.setTypeFr(experienceRequestDTO.getTypeFr() != null ? experienceRequestDTO.getTypeFr() : experienceRequestDTO.getTypeEn());


        Experience savedExperience = experienceRepository.save(experience);

        return new ExperienceResponseDTO(
                savedExperience.getExperienceId(),
                savedExperience.getCompanyNameEn(),
                savedExperience.getCompanyNameFr(),
                savedExperience.getPositionTitleEn(),
                savedExperience.getPositionTitleFr(),
                savedExperience.getDescriptionEn(),
                savedExperience.getDescriptionFr(),
                savedExperience.getCityEn(),
                savedExperience.getCityFr(),
                savedExperience.getCountryEn(),
                savedExperience.getCountryFr(),
                savedExperience.getStartDate(),
                savedExperience.getEndDate(),
                savedExperience.getTechnologies(),
                savedExperience.getImage(),
                savedExperience.getTypeEn(),
                savedExperience.getTypeFr()
        );
    }


    @Override
    public ExperienceResponseDTO updateExperience(ExperienceRequestDTO experienceRequestDTO, String experienceId) {
        Experience foundExperience = experienceRepository.findExperienceByExperienceId(experienceId);

        if (foundExperience == null) {
            throw new NotFoundException("Unknown experienceId: " + experienceId);
        }

        // Update fields only if they are provided
        if (experienceRequestDTO.getCompanyNameEn() != null) {
            foundExperience.setCompanyNameEn(experienceRequestDTO.getCompanyNameEn());
        }
        if (experienceRequestDTO.getCompanyNameFr() != null) {
            foundExperience.setCompanyNameFr(experienceRequestDTO.getCompanyNameFr());
        }
        if (experienceRequestDTO.getPositionTitleEn() != null) {
            foundExperience.setPositionTitleEn(experienceRequestDTO.getPositionTitleEn());
        }
        if (experienceRequestDTO.getPositionTitleFr() != null) {
            foundExperience.setPositionTitleFr(experienceRequestDTO.getPositionTitleFr());
        }
        if (experienceRequestDTO.getDescriptionEn() != null) {
            foundExperience.setDescriptionEn(experienceRequestDTO.getDescriptionEn());
        }
        if (experienceRequestDTO.getDescriptionFr() != null) {
            foundExperience.setDescriptionFr(experienceRequestDTO.getDescriptionFr());
        }
        if (experienceRequestDTO.getCityEn() != null) {
            foundExperience.setCityEn(experienceRequestDTO.getCityEn());
        }
        if (experienceRequestDTO.getCityFr() != null) {
            foundExperience.setCityFr(experienceRequestDTO.getCityFr());
        }
        if (experienceRequestDTO.getCountryEn() != null) {
            foundExperience.setCountryEn(experienceRequestDTO.getCountryEn());
        }
        if (experienceRequestDTO.getCountryFr() != null) {
            foundExperience.setCountryFr(experienceRequestDTO.getCountryFr());
        }
        if (experienceRequestDTO.getStartDate() != null) {
            foundExperience.setStartDate(experienceRequestDTO.getStartDate());
        }
        if (experienceRequestDTO.getEndDate() != null) {
            foundExperience.setEndDate(experienceRequestDTO.getEndDate());
        }
        if (experienceRequestDTO.getTechnologies() != null) {
            foundExperience.setTechnologies(experienceRequestDTO.getTechnologies());
        }
        if (experienceRequestDTO.getImage() != null) {
            foundExperience.setImage(experienceRequestDTO.getImage());
        }
        if (experienceRequestDTO.getTypeEn() != null) {
            foundExperience.setTypeEn(experienceRequestDTO.getTypeEn());
        }
        if (experienceRequestDTO.getTypeFr() != null) {
            foundExperience.setTypeFr(experienceRequestDTO.getTypeFr());
        }


        Experience savedExperience = experienceRepository.save(foundExperience);

        // Return the updated ExperienceResponseDTO
        return new ExperienceResponseDTO(
                savedExperience.getExperienceId(),
                savedExperience.getCompanyNameEn(),
                savedExperience.getCompanyNameFr(),
                savedExperience.getPositionTitleEn(),
                savedExperience.getPositionTitleFr(),
                savedExperience.getDescriptionEn(),
                savedExperience.getDescriptionFr(),
                savedExperience.getCityEn(),
                savedExperience.getCityFr(),
                savedExperience.getCountryEn(),
                savedExperience.getCountryFr(),
                savedExperience.getStartDate(),
                savedExperience.getEndDate(),
                savedExperience.getTechnologies(),
                savedExperience.getImage(),
                savedExperience.getTypeEn(),
                savedExperience.getTypeFr()
        );
    }


    @Override
    public void deleteExperience(String experienceId) {
        Experience foundExperience = experienceRepository.findExperienceByExperienceId(experienceId);

        if(foundExperience == null){
            throw new NotFoundException("Unknown experienceId: " + experienceId);
        }

        try{
            experienceRepository.delete(foundExperience);

        }catch(DataIntegrityViolationException ex){

            throw new InUseException("Cannot delete experience with experienceId:" + experienceId);

        }
    }

    @Override
    public Experience getExperienceImageByExperienceID(String experienceId) {
        Experience experience = experienceRepository.findExperienceByExperienceId(experienceId);
        if (experience == null) {
            throw new NotFoundException("Unknown experienceId: " + experienceId);
        }
        return experience;
    }
}
