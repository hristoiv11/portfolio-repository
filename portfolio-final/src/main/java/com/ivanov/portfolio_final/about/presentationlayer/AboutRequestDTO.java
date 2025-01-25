package com.ivanov.portfolio_final.about.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AboutRequestDTO {

    private String image;
    private String description;
    private String languages;
}
