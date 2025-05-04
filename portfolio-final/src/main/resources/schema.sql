/*DROP TABLE IF EXISTS projects;*/
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    projectid VARCHAR(36) NOT NULL UNIQUE,
    name_en TEXT,
    name_fr TEXT,
    description_en TEXT,
    description_fr TEXT,
    technologies VARCHAR(255),
    link VARCHAR(255),
    image LONGBLOB
);

/*DROP TABLE IF EXISTS about;*/
CREATE TABLE IF NOT EXISTS about (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    aboutid VARCHAR(36) NOT NULL UNIQUE,
    image LONGBLOB,
    description_en TEXT,
    description_fr TEXT,
    languages VARCHAR(255),
    flags TEXT
    );

/*DROP TABLE IF EXISTS skills;*/
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skillid VARCHAR(36) NOT NULL UNIQUE,
    languages VARCHAR(255),
    frameworks VARCHAR(255),
    tools VARCHAR(255),
    database_technologies VARCHAR(255),
    methodologies VARCHAR(255)
    );

/*DROP TABLE IF EXISTS reviews;*/
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    approved BOOLEAN DEFAULT FALSE
);

/* DROP TABLE IF EXISTS experiences; */
CREATE TABLE IF NOT EXISTS experiences (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    experienceid VARCHAR(36) NOT NULL UNIQUE,
    company_name_en TEXT,
    company_name_fr TEXT,
    position_title_en TEXT,
    position_title_fr TEXT,
    description_en TEXT,
    description_fr TEXT,
    city_en TEXT,
    city_fr TEXT,
    country_en TEXT,
    country_fr TEXT,
    start_date DATE,
    end_date DATE,
    technologies VARCHAR(255),
    image LONGBLOB,
    type_en TEXT,
    type_fr TEXT
);

