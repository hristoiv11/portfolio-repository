package com.ivanov.portfolio_final.auth;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginRequestDTO {

        private String username;
        private String password;

        public String getUsername() { return username; }
        public String getPassword() { return password; }
}

