package com.ivanov.portfolio_final.contact;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ContactRequestDTO {


    private String name;
    private String email;
    private String subject;
    private String message;

}
