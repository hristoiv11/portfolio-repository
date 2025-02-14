package com.ivanov.portfolio_final.projects.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "projects")
@NoArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "projectid")
    private String projectId;

    @Column(name = "name_en", columnDefinition = "TEXT")
    private String nameEn;

    @Column(name = "name_fr", columnDefinition = "TEXT")
    private String nameFr;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "description_fr", columnDefinition = "TEXT")
    private String descriptionFr;

    @Column(name = "technologies")
    private String technologies;

    @Column(name = "link")
    private String link;

    @Column(name = "image")
    private String image;

}
