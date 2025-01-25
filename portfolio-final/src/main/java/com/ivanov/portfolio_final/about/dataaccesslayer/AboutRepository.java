package com.ivanov.portfolio_final.about.dataaccesslayer;

import com.ivanov.portfolio_final.projects.dataaccesslayer.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AboutRepository extends JpaRepository<About, Long> {

    About findAboutByAboutId(String aboutId);
}
