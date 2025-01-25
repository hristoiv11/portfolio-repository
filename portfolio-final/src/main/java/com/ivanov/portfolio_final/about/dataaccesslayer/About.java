package com.ivanov.portfolio_final.about.dataaccesslayer;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "about")
@NoArgsConstructor
public class About {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "aboutid")
    private String aboutId;

    @Column(name = "image")
    private String image;

    @Column(name = "description")
    private String description;

    @Column(name = "languages")
    private String languages;
}
