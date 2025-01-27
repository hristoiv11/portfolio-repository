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
