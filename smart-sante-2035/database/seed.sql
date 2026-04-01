-- =====================================================================
-- Données de démonstration - Smart Santé 2035
-- Contexte : Madagascar (régions et villes réelles)
-- =====================================================================
USE smart_sante_2035;

-- ----------------------------------------------------------------------
-- Rôles
-- ----------------------------------------------------------------------
INSERT INTO roles (code, label, description) VALUES
('COMMUNITY_AGENT',  'Agent communautaire', 'Enregistre les patients sur le terrain'),
('MEDICAL_STAFF',    'Personnel médical',   'Infirmier / aide-soignant'),
('DOCTOR',           'Médecin',             'Validation des diagnostics et décisions'),
('HOSPITAL_ADMIN',   'Admin hôpital',       'Gère un hôpital (lits, équipe)'),
('REGIONAL_MANAGER', 'Manager régional',    'Supervise une région'),
('SYSTEM_ADMIN',     'Admin système',       'Administre tout le système');

-- ----------------------------------------------------------------------
-- Hôpitaux (50 établissements répartis dans les régions de Madagascar)
-- Coordonnées approximatives des grandes villes
-- ----------------------------------------------------------------------
INSERT INTO hospitals (name, city, region, latitude, longitude, phone, total_beds, available_beds, specialties, status) VALUES
('CHU Joseph Ravoahangy Andrianavalona','Antananarivo','Analamanga',-18.9100,47.5250,'+261202223344',350,42,'urgences,cardiologie,chirurgie,maternite','OPERATIONAL'),
('CHU Befelatanana','Antananarivo','Analamanga',-18.9050,47.5150,'+261202224455',280,30,'urgences,medecine,pediatrie','OPERATIONAL'),
('Hopital HJRB Anosiala','Antananarivo','Analamanga',-18.8500,47.5300,'+261202225566',150,18,'urgences,maternite','OPERATIONAL'),
('CHU Toamasina','Toamasina','Atsinanana',-18.1492,49.4023,'+261535312345',220,25,'urgences,chirurgie,maternite','OPERATIONAL'),
('Hopital Be Mahajanga','Mahajanga','Boeny',-15.7167,46.3167,'+261624400123',180,21,'urgences,pediatrie,maternite','OPERATIONAL'),
('CHU Andrainjato Fianarantsoa','Fianarantsoa','Haute Matsiatra',-21.4536,47.0857,'+261755030000',160,12,'urgences,medecine','OPERATIONAL'),
('CHU Toliara','Toliara','Atsimo-Andrefana',-23.3500,43.6667,'+261944411222',140,9,'urgences,maternite','OPERATIONAL'),
('CHU Antsiranana','Antsiranana','Diana',-12.2787,49.2917,'+261822212345',130,15,'urgences,chirurgie','OPERATIONAL'),
('Hopital Antsirabe','Antsirabe','Vakinankaratra',-19.8659,47.0333,'+261444800111',170,20,'urgences,pediatrie','OPERATIONAL'),
('Hopital Manakara','Manakara','Vatovavy',-22.1333,48.0167,'+261724501234',80,6,'urgences','OPERATIONAL'),
('Hopital Morondava','Morondava','Menabe',-20.2833,44.2833,'+261956000111',75,9,'urgences,maternite','OPERATIONAL'),
('Hopital Sambava','Sambava','Sava',-14.2667,50.1667,'+261882211100',70,5,'urgences','OPERATIONAL'),
('Hopital Tolagnaro','Tolagnaro','Anosy',-25.0319,46.9817,'+261924112233',65,4,'urgences','OPERATIONAL'),
('Hopital Maintirano','Maintirano','Melaky',-18.0667,44.0333,'+261339911223',50,3,'urgences','OPERATIONAL'),
('Hopital Ambositra','Ambositra','Amoron-i-Mania',-20.5333,47.2500,'+261474110000',60,7,'urgences','OPERATIONAL'),
('Hopital Ihosy','Ihosy','Ihorombe',-22.4000,46.1167,'+261327711000',45,2,'urgences','OPERATIONAL'),
('Hopital Mananjary','Mananjary','Vatovavy',-21.2333,48.3333,'+261724512000',55,8,'urgences,maternite','OPERATIONAL'),
('Hopital Farafangana','Farafangana','Atsimo-Atsinanana',-22.8167,47.8333,'+261724513000',60,5,'urgences','OPERATIONAL'),
('Hopital Ambatondrazaka','Ambatondrazaka','Alaotra-Mangoro',-17.8333,48.4167,'+261544100012',85,11,'urgences,maternite','OPERATIONAL'),
('Hopital Moramanga','Moramanga','Alaotra-Mangoro',-18.9433,48.2300,'+261544222200',70,9,'urgences','OPERATIONAL'),
('Hopital Tsiroanomandidy','Tsiroanomandidy','Bongolava',-18.7667,46.0333,'+261338800111',55,6,'urgences','OPERATIONAL'),
('Hopital Miarinarivo','Miarinarivo','Itasy',-19.0000,46.7333,'+261338811222',50,4,'urgences','OPERATIONAL'),
('Hopital Ambanja','Ambanja','Diana',-13.6833,48.4500,'+261822222111',55,7,'urgences','OPERATIONAL'),
('Hopital Antalaha','Antalaha','Sava',-14.9000,50.2833,'+261882245000',60,8,'urgences','OPERATIONAL'),
('Hopital Vohemar','Vohemar','Sava',-13.3667,50.0167,'+261882256000',45,3,'urgences','OPERATIONAL'),
('Hopital Mahanoro','Mahanoro','Atsinanana',-19.9000,48.8000,'+261535320000',50,6,'urgences','OPERATIONAL'),
('Hopital Vatomandry','Vatomandry','Atsinanana',-19.3333,48.9833,'+261535330000',45,5,'urgences','OPERATIONAL'),
('Hopital Andilamena','Andilamena','Alaotra-Mangoro',-17.0167,48.5667,'+261544444444',40,2,'urgences','SATURATED'),
('Hopital Marovoay','Marovoay','Boeny',-16.1000,46.6333,'+261624499000',50,7,'urgences','OPERATIONAL'),
('Hopital Port-Berge','Port-Berge','Sofia',-15.5667,47.6333,'+261324900100',45,5,'urgences','OPERATIONAL'),
('Hopital Mampikony','Mampikony','Sofia',-16.0833,47.6333,'+261324910000',35,4,'urgences','OPERATIONAL'),
('Hopital Antsohihy','Antsohihy','Sofia',-14.8833,47.9833,'+261822233100',60,8,'urgences,maternite','OPERATIONAL'),
('Hopital Bealanana','Bealanana','Sofia',-14.5500,48.7333,'+261324920000',30,2,'urgences','OPERATIONAL'),
('Hopital Mandritsara','Mandritsara','Sofia',-15.8333,48.8167,'+261324930000',40,5,'urgences','OPERATIONAL'),
('Hopital Soavinandriana','Soavinandriana','Itasy',-19.1667,46.7333,'+261338822333',40,6,'urgences','OPERATIONAL'),
('Hopital Arivonimamo','Arivonimamo','Itasy',-19.0167,47.1833,'+261338833444',45,7,'urgences','OPERATIONAL'),
('Hopital Ankazobe','Ankazobe','Analamanga',-18.3167,47.1167,'+261202267000',35,4,'urgences','OPERATIONAL'),
('Hopital Manjakandriana','Manjakandriana','Analamanga',-18.9167,47.7833,'+261202277000',40,6,'urgences','OPERATIONAL'),
('Hopital Anjozorobe','Anjozorobe','Analamanga',-18.4000,47.8667,'+261202288000',35,3,'urgences','OPERATIONAL'),
('Hopital Betafo','Betafo','Vakinankaratra',-19.8333,46.8500,'+261444822000',50,8,'urgences','OPERATIONAL'),
('Hopital Faratsiho','Faratsiho','Vakinankaratra',-19.4000,46.9500,'+261444833000',40,5,'urgences','OPERATIONAL'),
('Hopital Ambatolampy','Ambatolampy','Vakinankaratra',-19.3833,47.4333,'+261444844000',45,6,'urgences','OPERATIONAL'),
('Hopital Ambohimahasoa','Ambohimahasoa','Haute Matsiatra',-21.1333,47.2333,'+261755041000',40,5,'urgences','OPERATIONAL'),
('Hopital Ambalavao','Ambalavao','Haute Matsiatra',-21.8333,46.9333,'+261755052000',45,4,'urgences','OPERATIONAL'),
('Hopital Ikongo','Ikongo','Fitovinany',-21.8833,47.4167,'+261755063000',30,2,'urgences','OPERATIONAL'),
('Hopital Mananara Avaratra','Mananara Avaratra','Analanjirofo',-16.1667,49.7667,'+261535400000',45,6,'urgences','OPERATIONAL'),
('Hopital Maroantsetra','Maroantsetra','Analanjirofo',-15.4333,49.7333,'+261535410000',50,7,'urgences','OPERATIONAL'),
('Hopital Fenoarivo Atsinanana','Fenoarivo Atsinanana','Analanjirofo',-17.3833,49.4000,'+261535420000',55,8,'urgences','OPERATIONAL'),
('Hopital Soanierana Ivongo','Soanierana Ivongo','Analanjirofo',-16.9167,49.5833,'+261535430000',35,4,'urgences','OPERATIONAL'),
('Hopital Sainte Marie','Sainte Marie','Analanjirofo',-17.0833,49.8500,'+261535440000',30,3,'urgences','OPERATIONAL');

-- ----------------------------------------------------------------------
-- Utilisateurs (mots de passe : "Demo1234!" hashés en bcrypt - cost 10)
-- Hash bcrypt commun à tous pour démo : $2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq
-- (à régénérer lors du seed Node si besoin, voir docs/README.md)
-- ----------------------------------------------------------------------
INSERT INTO users (full_name, email, phone, password_hash, role_id, hospital_id, region, is_active) VALUES
('Rabe Jean',            'admin@smartsante.mg',     '+261341111111', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 6, 1, 'Analamanga', 1),
('Rasoa Marie',          'doctor@smartsante.mg',    '+261342222222', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 3, 1, 'Analamanga', 1),
('Andry Paul',           'staff@smartsante.mg',     '+261343333333', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 2, 1, 'Analamanga', 1),
('Hery Soa',             'agent@smartsante.mg',     '+261344444444', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 1, NULL, 'Analamanga', 1),
('Naina Faly',           'hospital@smartsante.mg',  '+261345555555', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 4, 1, 'Analamanga', 1),
('Tahina Be',            'region@smartsante.mg',    '+261346666666', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 5, NULL, 'Analamanga', 1),
('Lalao Mamy',           'doctor2@smartsante.mg',   '+261347777777', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 3, 4, 'Atsinanana', 1),
('Niry Tiana',           'staff2@smartsante.mg',    '+261348888888', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 2, 5, 'Boeny', 1),
('Fenosoa Rina',         'doctor3@smartsante.mg',   '+261349999999', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 3, 6, 'Haute Matsiatra', 1),
('Volana Hasina',        'agent2@smartsante.mg',    '+261341010101', '$2b$10$iLKDgtpeJnACaOmRvWBzxOyyOlcXifOTYagvkPrlBEvw7w6wfXKEq', 1, NULL, 'Atsinanana', 1);

-- ----------------------------------------------------------------------
-- Patients de démonstration
-- ----------------------------------------------------------------------
INSERT INTO patients (uuid, full_name, birth_date, gender, phone, city, region, medical_history, created_by) VALUES
('P-0001','Andriamampianina Soa','1985-04-12','F','+261331100001','Antananarivo','Analamanga','Hypertension',4),
('P-0002','Rakotomalala Jean','1972-08-30','M','+261331100002','Toamasina','Atsinanana','Diabete type 2',10),
('P-0003','Razafindrabe Lova','2015-01-22','F','+261331100003','Mahajanga','Boeny','Asthme',4),
('P-0004','Andrianjafy Tojo','1990-06-10','M','+261331100004','Fianarantsoa','Haute Matsiatra','RAS',4),
('P-0005','Ranaivoson Hery','2002-11-05','M','+261331100005','Toliara','Atsimo-Andrefana','RAS',4),
('P-0006','Rasolofo Lala','1968-02-18','F','+261331100006','Antsiranana','Diana','Hypertension severe',4),
('P-0007','Rakoto Mamy','1995-09-25','M','+261331100007','Antsirabe','Vakinankaratra','RAS',10),
('P-0008','Rabarison Niry','2018-03-14','F','+261331100008','Manakara','Vatovavy','Anemie',4),
('P-0009','Andriana Faly','1980-12-01','M','+261331100009','Morondava','Menabe','RAS',4),
('P-0010','Rasolomanana Voa','1955-07-19','F','+261331100010','Antananarivo','Analamanga','Insuffisance cardiaque',4);

-- ----------------------------------------------------------------------
-- Triages de démonstration
-- ----------------------------------------------------------------------
INSERT INTO triages (patient_id, score_vital, score_symptomes, score_antecedents, score_age, score_global, level, symptoms, recommended_action, hospital_id, status, created_by) VALUES
(1, 30, 40, 20, 30, 31.50, 'STABLE',      'Maux de tete',                'Surveillance, antalgique',                1, 'EN_ATTENTE', 3),
(2, 80, 75, 60, 50, 72.25, 'TRES_URGENT', 'Douleur thoracique, sueurs',  'Prise en charge cardiologique rapide',    1, 'EN_ATTENTE', 3),
(3, 50, 60, 30, 70, 53.50, 'URGENT',      'Crise d''asthme',             'Bronchodilatateurs, oxygenotherapie',     5, 'EN_ATTENTE', 8),
(4, 20, 25, 10, 20, 20.75, 'LEGER',       'Toux legere',                 'Repos, hydratation',                      6, 'TERMINE',    9),
(6, 90, 85, 80, 80, 86.00, 'CRITIQUE',    'AVC suspect, paralysie',      'Reanimation immediate',                   8, 'EN_ATTENTE', 3),
(10,85, 70, 90, 80, 79.75, 'CRITIQUE',    'OAP, dyspnee severe',         'Reanimation, oxygenotherapie',            1, 'EN_ATTENTE', 3);

-- ----------------------------------------------------------------------
-- Quelques routes inter-hôpitaux (Dijkstra)
-- ----------------------------------------------------------------------
INSERT INTO hospital_routes (from_hospital_id, to_hospital_id, distance_km, road_quality) VALUES
(1,2,5,'BONNE'),(2,1,5,'BONNE'),
(1,3,12,'BONNE'),(3,1,12,'BONNE'),
(1,9,170,'MOYENNE'),(9,1,170,'MOYENNE'),
(1,4,370,'MOYENNE'),(4,1,370,'MOYENNE'),
(1,5,560,'MAUVAISE'),(5,1,560,'MAUVAISE'),
(1,6,410,'MOYENNE'),(6,1,410,'MOYENNE'),
(1,7,950,'MAUVAISE'),(7,1,950,'MAUVAISE'),
(1,8,1100,'MAUVAISE'),(8,1,1100,'MAUVAISE'),
(9,6,260,'MOYENNE'),(6,9,260,'MOYENNE'),
(4,20,115,'BONNE'),(20,4,115,'BONNE'),
(20,1,115,'BONNE'),(1,20,115,'BONNE');

-- ----------------------------------------------------------------------
-- Notifications de test
-- ----------------------------------------------------------------------
INSERT INTO notifications (user_id, title, message, type) VALUES
(2, 'Nouveau patient critique', 'Patient P-0006 (AVC suspect) en attente', 'URGENCE'),
(2, 'Lits faibles', 'CHU Joseph Ravoahangy : 42 lits restants', 'ALERTE'),
(3, 'Bienvenue', 'Bienvenue sur Smart Sante 2035', 'INFO');
