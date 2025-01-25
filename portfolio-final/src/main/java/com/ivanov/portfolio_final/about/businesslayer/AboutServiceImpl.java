package com.ivanov.portfolio_final.about.businesslayer;

import com.ivanov.portfolio_final.about.dataaccesslayer.About;
import com.ivanov.portfolio_final.about.dataaccesslayer.AboutRepository;
import com.ivanov.portfolio_final.about.presentationlayer.AboutRequestDTO;
import com.ivanov.portfolio_final.about.presentationlayer.AboutResponseDTO;
import com.ivanov.portfolio_final.utils.exceptions.InUseException;
import com.ivanov.portfolio_final.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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
    public About getAboutImageByAboutID(String aboutId) {
        About about = aboutRepository.findAboutByAboutId(aboutId);
        if (about == null) {
            throw new NotFoundException("Unknown aboutId: " + aboutId);
        }
        return about;
    }
}
