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

DROP TABLE IF EXISTS about;
CREATE TABLE IF NOT EXISTS about (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    aboutid VARCHAR(36) NOT NULL UNIQUE,
    image LONGBLOB,
    description TEXT,
    languages VARCHAR(255)
    );

DROP TABLE IF EXISTS skills;
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skillid VARCHAR(36) NOT NULL UNIQUE,
    languages VARCHAR(255),
    frameworks VARCHAR(255),
    tools VARCHAR(255),
    database_technologies VARCHAR(255),
    methodologies VARCHAR(255)
    );

DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    approved BOOLEAN DEFAULT FALSE
);


