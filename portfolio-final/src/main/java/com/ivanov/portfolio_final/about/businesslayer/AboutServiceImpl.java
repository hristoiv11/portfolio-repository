package com.ivanov.portfolio_final.about.businesslayer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ivanov.portfolio_final.about.dataaccesslayer.About;
import com.ivanov.portfolio_final.about.dataaccesslayer.AboutRepository;
import com.ivanov.portfolio_final.about.presentationlayer.AboutRequestDTO;
import com.ivanov.portfolio_final.about.presentationlayer.AboutResponseDTO;
import com.ivanov.portfolio_final.utils.exceptions.InUseException;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AboutServiceImpl implements AboutService{

    private AboutRepository aboutRepository;

    public AboutServiceImpl(AboutRepository aboutRepository){

        this.aboutRepository=aboutRepository;
    }

    @Override
    public List<AboutResponseDTO> getAllAbouts() {

        List<About> aboutEntities = aboutRepository.findAll();


        List<AboutResponseDTO> aboutResponseDTOList = new ArrayList<>();

        for(About about : aboutEntities){
            AboutResponseDTO aboutResponseDTO = new AboutResponseDTO();
            BeanUtils.copyProperties(about, aboutResponseDTO);

            aboutResponseDTOList.add(aboutResponseDTO);
        }

        return aboutResponseDTOList;
    }

    @Override
    public AboutResponseDTO getAboutByAboutID(String aboutId) {

        About about = aboutRepository.findAboutByAboutId(aboutId);

        if(about == null){
            throw new NotFoundException("Unknown aboutId: " + aboutId);
        }

        AboutResponseDTO aboutResponseDTO = new AboutResponseDTO();
        BeanUtils.copyProperties(about,aboutResponseDTO);
        return aboutResponseDTO;
    }

    @Override
    public AboutResponseDTO addAbout(AboutRequestDTO aboutRequestDTO) {

        About about = new About();
        BeanUtils.copyProperties(aboutRequestDTO,about);
        about.setAboutId(UUID.randomUUID().toString());

        About savedAbout = aboutRepository.save(about);

        AboutResponseDTO aboutResponseDTO = new AboutResponseDTO();
        BeanUtils.copyProperties(savedAbout,aboutResponseDTO);

        return aboutResponseDTO;
    }

    @Override
    public AboutResponseDTO updateAbout(AboutRequestDTO aboutRequestDTO, String aboutId) {

        About foundAbout = aboutRepository.findAboutByAboutId(aboutId);

        if(foundAbout == null){
            throw new NotFoundException("Unknown aboutId: " + aboutId);
        }

        About about = new About();
        BeanUtils.copyProperties(aboutRequestDTO,about);

        about.setAboutId(foundAbout.getAboutId());
        about.setId(foundAbout.getId());

        About savedAbout = aboutRepository.save(about);

        AboutResponseDTO aboutResponseDTO = new AboutResponseDTO();
        BeanUtils.copyProperties(savedAbout,aboutResponseDTO);

        return aboutResponseDTO;
    }

    @Override
    public void deleteAbout(String aboutId) {
        About foundAbout = aboutRepository.findAboutByAboutId(aboutId);

        if(foundAbout == null){
            throw new NotFoundException("Unknown aboutId: " + aboutId);
        }

        try{
            aboutRepository.delete(foundAbout);

        }catch(DataIntegrityViolationException ex){

            throw new InUseException("Cannot delete about with aboutId:" + aboutId);

        }
    }

    @Override
    public void deleteLanguage(String aboutId, String languageName) {
        About foundAbout = aboutRepository.findAboutByAboutId(aboutId);

        if (foundAbout == null) {
            throw new NotFoundException("Unknown aboutId: " + aboutId);
        }

        ObjectMapper objectMapper = new ObjectMapper(); // Jackson ObjectMapper

        try {
            // Convert flags JSON string to a Map
            Map<String, String> flags = objectMapper.readValue(foundAbout.getFlags(), Map.class);

            if (flags == null || !flags.containsKey(languageName)) {
                throw new NotFoundException("Language not found: " + languageName);
            }

            // Remove the language from the flags map
            flags.remove(languageName);

            // Update the languages field (Convert to List, remove, and join back to a string)
            List<String> languagesList = new ArrayList<>(Arrays.asList(foundAbout.getLanguages().split(", ")));
            languagesList.remove(languageName);

            // Convert updated flags back to JSON and update languages string
            foundAbout.setFlags(objectMapper.writeValueAsString(flags));
            foundAbout.setLanguages(String.join(", ", languagesList)); // ✅ Update languages list

            aboutRepository.save(foundAbout);

        } catch (Exception e) {
            throw new RuntimeException("Error processing JSON", e);
        }
    }


    @Override
    public About getAboutImageByAboutID(String aboutId) {
        About about = aboutRepository.findAboutByAboutId(aboutId);
        if (about == null) {
            throw new NotFoundException("Unknown aboutId: " + aboutId);
        }
        return about;
    }
}
