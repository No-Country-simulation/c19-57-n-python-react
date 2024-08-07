-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: no_country
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mascota`
--

DROP TABLE IF EXISTS `mascota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascota` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `animal_type` varchar(250) NOT NULL,
  `race` varchar(250) NOT NULL,
  `year` int NOT NULL,
  `history` varchar(250) NOT NULL,
  `gender` varchar(250) NOT NULL,
  `size` int NOT NULL,
  `characteristics` varchar(250) NOT NULL,
  `location` varchar(250) NOT NULL,
  `status` int NOT NULL,
  `imagen_profile` varchar(250) NOT NULL,
  `imagen_details` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascota`
--

LOCK TABLES `mascota` WRITE;
/*!40000 ALTER TABLE `mascota` DISABLE KEYS */;
INSERT INTO `mascota` VALUES (1,'08-01-2024','Nala','perro','Beagle',14,'Nala es un perro de raza Beagle que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Independiente, Protector, Curioso y se lleva bien con otros animales. Actualmente se encuentra en Peru, esperando un hogar amoroso.','Femenino',14,'Independiente, Protector, Curioso','Peru',0,'perro1.jpeg','perro1_1.jpeg,perro1_2.jpeg'),(2,'08-01-2024','Milo','perro','Dachshund',7,'Milo es un perro de raza Dachshund que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Curioso, CariÃ±oso, Activo y se lleva bien con otros animales. Actualmente se encuentra en Peru, esperando un hogar amoroso.','Femenino',20,'Curioso, CariÃ±oso, Activo','Chile',0,'perro2.jpeg','perro2_1.jpeg,perro2_2.jpeg'),(3,'08-01-2024','Coco','perro','Beagle',8,'Coco es un perro de raza Beagle que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Sociable, Amistoso, Tranquilo y se lleva bien con otros animales. Actualmente se encuentra en Colombia, esperando un hogar amoroso.','Masculino',13,'Sociable, Amistoso, Tranquilo','Colombia',0,'perro3.jpeg','perro3_1.jpeg,perro3_2.jpeg'),(4,'08-01-2024','Lucy','gato','Birmano',13,'Lucy es un gato de raza Birmano que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Sociable, Curioso, Activo y se lleva bien con otros animales. Actualmente se encuentra en Peru, esperando un hogar amoroso.','Masculino',18,'Sociable, Curioso, Activo','Peru',1,'gato4.jpeg','gato4_1.jpeg,gato4_2.jpeg'),(5,'08-01-2024','Oliver','gato','Persa',13,'Oliver es un gato de raza Persa que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Protector, Inteligente, Independiente y se lleva bien con otros animales. Actualmente se encuentra en Chile, esperando un hogar amoroso.','Masculino',15,'Protector, Inteligente, Independiente','Peru',0,'gato5.jpeg','gato5_1.jpeg,gato5_2.jpeg'),(6,'08-01-2024','Pipo','perro','Poodle',5,'Oliver es un perro de raza Poodle que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Curioso, Activo, Independiente y se lleva bien con otros animales. Actualmente se encuentra en Colombia, esperando un hogar amoroso.','Femenino',16,'Curioso, Activo, Independiente','Colombia',0,'perro6.jpeg','perro6_1.jpeg,perro6_2.jpeg'),(7,'08-01-2024','Max','perro','Golden Retriever',2,'Max es un perro de raza Golden Retriever que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Sociable, CariÃ±oso, Amistoso y se lleva bien con otros animales. Actualmente se encuentra en Peru, esperando un hogar amoroso.','Masculino',29,'Sociable, CariÃ±oso, Amistoso','Peru',1,'perro7.jpeg','perro7_1.jpeg,perro7_2.jpeg'),(8,'08-01-2024','Simba','perro','Shih Tzu',4,'Simba es un perro de raza Shih Tzu que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Activo, JuguetÃ³n, Curioso y se lleva bien con otros animales. Actualmente se encuentra en Argentina, esperando un hogar amoroso.','Femenino',15,'Activo, JuguetÃ³n, Curioso','Argentina',1,'perro8.jpeg','perro8_1.jpeg,perro8_2.jpeg'),(9,'08-01-2024','Charlie','gato','Azul Ruso',9,'Charlie es un gato de raza Azul Ruso que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Curioso, Independiente, Inteligente y se lleva bien con otros animales. Actualmente se encuentra en Argentina, esperando un hogar amoroso.','Masculino',20,'Curioso, Independiente, Inteligente','Chile',1,'gato9.jpeg','gato9_1.jpeg,gato9_2.jpeg'),(10,'08-01-2024','Milo','gato','Sphynx',14,'Milo es un gato de raza Sphynx que fue rescatado de una situaciÃ³n difÃ­cil. Ha mostrado ser Amistoso, Independiente, CariÃ±oso y se lleva bien con otros animales. Actualmente se encuentra en Peru, esperando un hogar amoroso.','Femenino',20,'Amistoso, Independiente, CariÃ±oso','Peru',1,'gato10.jpeg','gato10_1.jpeg,gato10_2.jpeg'),(25,'08-02-2024','gato','gato','gato',2,'-','masculino',12,'curioso','Buenos Aires',0,'presentacion_gato.jpg','presentacion_gato_2.jpg');
/*!40000 ALTER TABLE `mascota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudadopcion`
--

DROP TABLE IF EXISTS `solicitudadopcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudadopcion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` date NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `genre` enum('F','M') NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int NOT NULL,
  `type_appli` enum('adopcion','transitorio') NOT NULL,
  `employm_situ` enum('empleado','desempleado','pensionado') NOT NULL,
  `income_range` enum('500.000-700.000','700.001-900.000','900.001-1.100.000','1.100.001- y más') DEFAULT NULL,
  `type_of_house` enum('casa','depto') NOT NULL,
  `yard` enum('si','no') NOT NULL,
  `mt2_yard` int DEFAULT NULL,
  `another_pet` enum('si','no') NOT NULL,
  `another_pet_desc` varchar(100) DEFAULT NULL,
  `status_appli` enum('pendiente','aprobada','rechazada') DEFAULT NULL,
  `id_mascota` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_mascota` (`id_mascota`),
  KEY `ix_solicitudadopcion_email` (`email`),
  KEY `ix_solicitudadopcion_id` (`id`),
  CONSTRAINT `solicitudadopcion_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascota` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudadopcion`
--

LOCK TABLES `solicitudadopcion` WRITE;
/*!40000 ALTER TABLE `solicitudadopcion` DISABLE KEYS */;
INSERT INTO `solicitudadopcion` VALUES (2,'2024-08-02','Lautaro','Martinez',27,'M','lautaromartinez@gmail.com',1123423423,'adopcion','empleado','1.100.001- y más','casa','si',14,'si','Un gato ','pendiente',3),(3,'2024-08-02','Lionel ','Messi',34,'M','lionelmessi@gmail.com',1123423412,'adopcion','empleado','1.100.001- y más','casa','si',50,'si','Otro perro','aprobada',1),(4,'2024-08-02','Cristiano','Ronaldo',39,'M','cristianoronaldo@gmail.com',1123457777,'adopcion','empleado','1.100.001- y más','casa','si',120,'si','Un perro','rechazada',5),(5,'2024-08-02','Nicolas','Otamendi',36,'M','nicoota@gmail.com',1212121212,'adopcion','empleado','1.100.001- y más','casa','si',50,'si','Un gato ','pendiente',1);
/*!40000 ALTER TABLE `solicitudadopcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_at` varchar(250) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `phone` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `imgen_profile` varchar(250) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'testing','user','prueba',0,'1122223333','Argentina','Masculino','default_profile.jpg','test@test.com','$2b$12$XVSiw6slidlReH944w0pzeLxe3PeNO455q8/Ja2DGminkAjmd6PT.');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-06 16:31:12
