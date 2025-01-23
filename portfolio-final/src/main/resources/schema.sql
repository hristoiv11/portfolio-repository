DROP TABLE IF EXISTS items;
CREATE TABLE IF NOT EXISTS items (
                                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                    name VARCHAR(255) NOT NULL,
    description TEXT
    );

DROP TABLE IF EXISTS namess;
CREATE TABLE IF NOT EXISTS namess (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(255) NOT NULL,
                                        lastname VARCHAR(255) NOT NULL
    );
