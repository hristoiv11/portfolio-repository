package com.ivanov.portfolio_final.experience.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ExperienceRepository extends JpaRepository<Experience, Long>{

    Experience findExperienceByExperienceId(String experienceId);
}
