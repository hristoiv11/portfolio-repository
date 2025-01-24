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

DROP TABLE IF EXISTS projects;
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    projectid VARCHAR(36) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    technologies VARCHAR(255),
    link VARCHAR(255),
    image LONGBLOB
);
