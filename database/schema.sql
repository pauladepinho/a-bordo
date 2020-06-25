-- -----------------------------------------------------
-- Schema aBordo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS abordo;
USE abordo ;

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  forename VARCHAR(100),
  surname VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(13),
  password VARCHAR(256),
  picture VARCHAR(256)
);

-- -----------------------------------------------------
-- Table schools
-- -----------------------------------------------------
CREATE TABLE schools (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  state VARCHAR(2) NOT NULL,
  municipality VARCHAR(100) NOT NULL,
  name VARCHAR(100) NOT NULL,
  passing_grade FLOAT NOT NULL,
  academic_terms INT NOT NULL
);

-- -----------------------------------------------------
-- Table users_schools
-- -----------------------------------------------------
CREATE TABLE users_schools (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  users_id INT NOT NULL,
  schools_id INT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (schools_id) REFERENCES schools (id)
);

-- -----------------------------------------------------
-- Table classes
-- -----------------------------------------------------
CREATE TABLE classes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  schools_id INT NOT NULL,
  code VARCHAR(10) NOT NULL,
  number_of_students INT,
  number_of_courses INT,
  number_of_teachers INT,
  FOREIGN KEY (schools_id) REFERENCES schools (id)
);

-- -----------------------------------------------------
-- Table users_classes
-- -----------------------------------------------------
CREATE TABLE users_classes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  users_id INT NOT NULL,
  classes_id INT NOT NULL,
  schools_id INT NOT NULL,
  student_number INT,
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (classes_id) REFERENCES classes (id),
  FOREIGN KEY (schools_id) REFERENCES classes (schools_id)
);

-- -----------------------------------------------------
-- Table courses
-- -----------------------------------------------------
CREATE TABLE courses (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------
-- Table users_courses
-- -----------------------------------------------------
CREATE TABLE users_courses (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  users_id INT NOT NULL,
  courses_id INT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (courses_id) REFERENCES courses (id)
);

-- -----------------------------------------------------
-- Table classes_courses
-- -----------------------------------------------------
CREATE TABLE classes_courses (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  classes_id INT NOT NULL,
  courses_id INT NOT NULL,
  FOREIGN KEY (classes_id) REFERENCES classes (id),
  FOREIGN KEY (courses_id) REFERENCES courses (id)
);

-- -----------------------------------------------------
-- Table evaluations
-- -----------------------------------------------------
CREATE TABLE evaluations (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  classes_courses_id INT NOT NULL,
  evaluation_number INT,
  max_grade FLOAT,
  title VARCHAR(100),
  color VARCHAR(45),
  type VARCHAR(45),
  date DATE,
  academic_term INT,
  FOREIGN KEY (classes_courses_id) REFERENCES classes_courses (id)
);

-- -----------------------------------------------------
-- Table evaluations_users
-- -----------------------------------------------------
CREATE TABLE evaluations_users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  evaluations_id INT NOT NULL,
  users_id INT NOT NULL,
  evaluated TINYINT,
  grade FLOAT,
  FOREIGN KEY (evaluations_id) REFERENCES evaluations (id),
  FOREIGN KEY (users_id) REFERENCES users (id)
);

-- -----------------------------------------------------
-- Table attendances
-- -----------------------------------------------------
CREATE TABLE attendances (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  users_id INT NOT NULL,
  classes_id INT NOT NULL,
  courses_id INT NOT NULL,
  type VARCHAR(45),
  evaluation_day TINYINT,
  date DATE,
  academic_term INT,
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (classes_id) REFERENCES classes_courses (classes_id),
  FOREIGN KEY (courses_id) REFERENCES classes_courses (courses_id)
);

-- -----------------------------------------------------
-- Table userTypes
-- -----------------------------------------------------
CREATE TABLE userTypes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  type VARCHAR(45) NOT NULL
);

-- -----------------------------------------------------
-- Table users_userTypes
-- -----------------------------------------------------
CREATE TABLE users_userTypes (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  users_id INT NOT NULL,
  userTypes_id INT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (userTypes_id) REFERENCES userTypes (id)
);