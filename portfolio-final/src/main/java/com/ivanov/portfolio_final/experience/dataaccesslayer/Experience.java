package com.ivanov.portfolio_final.experience.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "experiences")
@NoArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "experienceid")
    private String experienceId;

    @Column(name = "company_name_en", columnDefinition = "TEXT")
    private String companyNameEn;

    @Column(name = "company_name_fr", columnDefinition = "TEXT")
    private String companyNameFr;

    @Column(name = "position_title_en", columnDefinition = "TEXT")
    private String positionTitleEn;

    @Column(name = "position_title_fr", columnDefinition = "TEXT")
    private String positionTitleFr;

    @Column(name = "description_en", columnDefinition = "TEXT")
    private String descriptionEn;

    @Column(name = "description_fr", columnDefinition = "TEXT")
    private String descriptionFr;

    @Column(name = "city_en", columnDefinition = "TEXT")
    private String cityEn;

    @Column(name = "city_fr", columnDefinition = "TEXT")
    private String cityFr;

    @Column(name = "country_en", columnDefinition = "TEXT")
    private String countryEn;

    @Column(name = "country_fr", columnDefinition = "TEXT")
    private String countryFr;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "technologies")
    private String technologies;

    @Column(name = "image")
    private String image; // Optional

    @Column(name = "type_en", columnDefinition = "TEXT")
    private String typeEn;

    @Column(name = "type_fr", columnDefinition = "TEXT")
    private String typeFr;



}
