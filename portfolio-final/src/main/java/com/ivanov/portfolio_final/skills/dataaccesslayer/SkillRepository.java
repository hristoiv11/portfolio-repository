package com.ivanov.portfolio_final.skills.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Skill findSkillBySkillId(String skillId);
}
