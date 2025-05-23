-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS auto_concesionaria;
USE auto_concesionaria;

-- Crear tabla concesionaria
CREATE TABLE IF NOT EXISTS concesionaria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    telefono VARCHAR(30) NOT NULL
);

-- Crear tabla auto
CREATE TABLE IF NOT EXISTS auto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    anio INT NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    concesionaria_id INT,
    FOREIGN KEY (concesionaria_id) REFERENCES concesionaria(id) ON DELETE SET NULL ON UPDATE CASCADE
);