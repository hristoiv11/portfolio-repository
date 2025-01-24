package com.ivanov.portfolio_final.projects.dataaccesslayer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Project findProjectByProjectId(String projectId);
}
