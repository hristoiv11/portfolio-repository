package com.ivanov.portfolio_final.skills.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "skills")
@NoArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "skillid")
    private String skillId;

    @Column(name = "languages")
    private String languages;

    @Column(name = "frameworks")
    private String frameworks;

    @Column(name = "tools")
    private String tools;

    @Column(name = "database_technologies")
    private String databaseTechnologies;

    @Column(name = "methodologies")
    private String methodologies;

}
