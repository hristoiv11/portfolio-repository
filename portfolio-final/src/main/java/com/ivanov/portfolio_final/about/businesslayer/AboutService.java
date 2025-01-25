package com.ivanov.portfolio_final.about.businesslayer;

import com.ivanov.portfolio_final.about.dataaccesslayer.About;
import com.ivanov.portfolio_final.about.presentationlayer.AboutRequestDTO;
import com.ivanov.portfolio_final.about.presentationlayer.AboutResponseDTO;
import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectRequestDTO;
import com.ivanov.portfolio_final.projects.presentationlayer.ProjectResponseDTO;

import java.util.List;

public interface AboutService {

    List<AboutResponseDTO> getAllAbouts();

    AboutResponseDTO getAboutByAboutID(String aboutId);

    AboutResponseDTO addAbout(AboutRequestDTO aboutRequestDTO);

    AboutResponseDTO updateAbout(AboutRequestDTO aboutRequestDTO, String aboutId);

    void deleteAbout(String aboutId);

    About getAboutImageByAboutID(String aboutId);
}
