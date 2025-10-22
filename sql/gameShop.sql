CREATE DATABASE IF NOT EXISTS gameShop;

USE gameShop;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    rol ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);

CREATE TABLE juegos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_lanzamiento DATE,
    desarrollador VARCHAR(100),
    Pegi ENUM('3', '7', '12', '16', '18') NOT NULL,
    foto mediumblob,
);

CREATE TABLE genero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE juego_genero (
    juego_id INT,
    genero_id INT,
    PRIMARY KEY (juego_id, genero_id),
    FOREIGN KEY (juego_id) REFERENCES juegos(id) ON DELETE CASCADE,
    FOREIGN KEY (genero_id) REFERENCES genero(id) ON DELETE CASCADE 
);

CREATE TABLE plataformas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE juego_plataforma (
    juego_id INT NOT NULL,
    plataforma_id INT NOT NULL,
    PRIMARY KEY (juego_id, plataforma_id),
    FOREIGN KEY (juego_id) REFERENCES juegos(id) ON DELETE CASCADE,
    FOREIGN KEY (plataforma_id) REFERENCES plataformas(id) ON DELETE CASCADE
);

CREATE TABLE LICENCIAS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_licencia VARCHAR(100) NOT NULL UNIQUE,
    precio DECIMAL(10, 2) NOT NULL,
    estado ENUM('disponible', 'vendido') NOT NULL DEFAULT 'disponible',
    fecha_alta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_juego INT NOT NULL, 
    id_oferta INT,
    FOREIGN KEY (id_juego) REFERENCES juegos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_oferta) REFERENCES ofertas(id) ON DELETE SET NULL,
    
);

CREATE TABLE ofertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descuento INT NOT NULL,
    estado ENUM('activa', 'inactiva') NOT NULL DEFAULT 'inactiva',
);

CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_licencia INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_licencia) REFERENCES licencias(id) ON DELETE CASCADE
);


CREATE TABLE review(
    id INT AUTO_INCREMENT PRIMARY KEY,
    comentario VARCHAR(500),
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    id_usuario INT NOT NULL,
    id_juego INT NOT NULL,
    id_plataforma INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_juego) REFERENCES juegos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_plataforma) REFERENCES plataformas(id) ON DELETE CASCADE
);