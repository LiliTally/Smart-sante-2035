DROP DATABASE IF EXISTS smart_sante_2035;
CREATE DATABASE smart_sante_2035 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE smart_sante_2035;
-- Table des rôles (6 rôles principaux du système)
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  label VARCHAR(100) NOT NULL,
  description TEXT
) ENGINE=InnoDB;
-- Utilisateurs (médecins, infirmiers, admin, etc.)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(30),
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  hospital_id INT NULL,
  region VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB;
-- Hôpitaux de Madagascar
CREATE TABLE hospitals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  phone VARCHAR(30),
  total_beds INT DEFAULT 0,
  available_beds INT DEFAULT 0,
  specialties VARCHAR(500), -- ex: "urgences,pediatrie,maternite"
  status ENUM('OPERATIONAL','SATURATED','CLOSED') DEFAULT 'OPERATIONAL',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Ajout de la clé étrangère sur users.hospital_id
ALTER TABLE users
  ADD CONSTRAINT fk_users_hospital
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE SET NULL;

-- Lits (gestion détaillée par hôpital)
CREATE TABLE beds (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hospital_id INT NOT NULL,
  bed_code VARCHAR(50) NOT NULL,
  type ENUM('STANDARD','URGENCE','REANIMATION','PEDIATRIE') DEFAULT 'STANDARD',
  is_occupied TINYINT(1) DEFAULT 0,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Patients
CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uuid VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(150) NOT NULL,
  birth_date DATE,
  gender ENUM('M','F','AUTRE') DEFAULT 'AUTRE',
  phone VARCHAR(30),
  city VARCHAR(100),
  region VARCHAR(100),
  medical_history TEXT,
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Triages (chaque consultation génère un triage)
CREATE TABLE triages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  -- Sous-scores (0 à 100)
  score_vital INT NOT NULL,
  score_symptomes INT NOT NULL,
  score_antecedents INT NOT NULL,
  score_age INT NOT NULL,
  -- Score global calculé
  score_global DECIMAL(5,2) NOT NULL,
  level ENUM('CRITIQUE','TRES_URGENT','URGENT','STABLE','LEGER') NOT NULL,
  symptoms TEXT,
  recommended_action VARCHAR(255),
  hospital_id INT NULL, -- hôpital recommandé
  status ENUM('EN_ATTENTE','PRIS_EN_CHARGE','TRANSFERE','TERMINE') DEFAULT 'EN_ATTENTE',
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Transferts entre hôpitaux
CREATE TABLE transfers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  triage_id INT,
  from_hospital_id INT,
  to_hospital_id INT NOT NULL,
  reason VARCHAR(255),
  status ENUM('DEMANDE','ACCEPTE','REFUSE','TERMINE') DEFAULT 'DEMANDE',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (triage_id) REFERENCES triages(id) ON DELETE SET NULL,
  FOREIGN KEY (from_hospital_id) REFERENCES hospitals(id),
  FOREIGN KEY (to_hospital_id) REFERENCES hospitals(id)
) ENGINE=InnoDB;

-- Notifications envoyées (urgences, transferts, etc.)
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(200),
  message TEXT,
  type ENUM('INFO','URGENCE','ALERTE') DEFAULT 'INFO',
  is_read TINYINT(1) DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Journal d'audit (traçabilité)
CREATE TABLE audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100),
  entity VARCHAR(100),
  entity_id INT,
  details TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Routes entre hôpitaux (pour Dijkstra)
CREATE TABLE hospital_routes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  from_hospital_id INT NOT NULL,
  to_hospital_id INT NOT NULL,
  distance_km DECIMAL(7,2) NOT NULL,
  road_quality ENUM('BONNE','MOYENNE','MAUVAISE') DEFAULT 'MOYENNE',
  FOREIGN KEY (from_hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE,
  FOREIGN KEY (to_hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Index utiles
CREATE INDEX idx_triages_level ON triages(level);
CREATE INDEX idx_triages_status ON triages(status);
CREATE INDEX idx_patients_uuid ON patients(uuid);
CREATE INDEX idx_hospitals_region ON hospitals(region);
