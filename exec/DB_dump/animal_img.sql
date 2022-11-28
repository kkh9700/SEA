-- MySQL dump 10.13  Distrib 5.7.39, for Linux (x86_64)
--
-- Host: localhost    Database: sea
-- ------------------------------------------------------
-- Server version	5.7.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal_animal_img`
--

DROP TABLE IF EXISTS `animal_animal_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animal_animal_img` (
  `animal_animal_id` int(11) NOT NULL,
  `animal_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  KEY `FKakg6xbt7om7kvfovmtgeem4fy` (`animal_animal_id`),
  CONSTRAINT `FKakg6xbt7om7kvfovmtgeem4fy` FOREIGN KEY (`animal_animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_animal_img`
--

LOCK TABLES `animal_animal_img` WRITE;
/*!40000 ALTER TABLE `animal_animal_img` DISABLE KEYS */;
INSERT INTO `animal_animal_img` VALUES (3,'/images/animal/Polar-Bear/1.jpg'),(3,'/images/animal/Polar-Bear/2.jpg'),(3,'/images/animal/Polar-Bear/3.jpg'),(4,'/images/animal/Fur-Seal/1.jpg'),(4,'/images/animal/Fur-Seal/2.jpg'),(4,'/images/animal/Fur-Seal/3.jpg'),(5,'/images/animal/Steller-Sea-Lion/1.jpg'),(5,'/images/animal/Steller-Sea-Lion/2.jpg'),(5,'/images/animal/Steller-Sea-Lion/3.jpg'),(6,'/images/animal/Marten/1.jpg'),(6,'/images/animal/Marten/2.jpg'),(6,'/images/animal/Marten/3.jpg'),(7,'/images/animal/Siberian-Flying-Squirrel/1.jpg'),(7,'/images/animal/Siberian-Flying-Squirrel/2.jpg'),(7,'/images/animal/Siberian-Flying-Squirrel/3.jpg'),(8,'/images/animal/Black-Rhinoceros/1.jpg'),(8,'/images/animal/Black-Rhinoceros/2.jpg'),(8,'/images/animal/Black-Rhinoceros/3.jpg'),(9,'/images/animal/Red-Wolf/1.jpg'),(9,'/images/animal/Red-Wolf/2.jpg'),(9,'/images/animal/Red-Wolf/3.jpg'),(10,'/images/animal/Snow-Leopard/1.jpg'),(10,'/images/animal/Snow-Leopard/2.jpg'),(10,'/images/animal/Snow-Leopard/3.jpg'),(11,'/images/animal/Musk-Deer/1.jpg'),(11,'/images/animal/Musk-Deer/2.jpg'),(11,'/images/animal/Musk-Deer/3.jpg'),(12,'/images/animal/Gharial/1.jpg'),(12,'/images/animal/Gharial/2.jpg'),(12,'/images/animal/Gharial/3.jpg'),(13,'/images/animal/Korean-Southern-Gudgeon/1.jpg'),(13,'/images/animal/Korean-Southern-Gudgeon/2.jpg'),(13,'/images/animal/Korean-Southern-Gudgeon/3.jpg'),(14,'/images/animal/Dwarf-Crocodile/1.jpg'),(14,'/images/animal/Dwarf-Crocodile/2.jpg'),(14,'/images/animal/Dwarf-Crocodile/3.jpg'),(15,'/images/animal/Otter/1.jpg'),(15,'/images/animal/Otter/2.jpg'),(15,'/images/animal/Otter/3.jpg'),(16,'/images/animal/Leopard-Cat/1.jpg'),(16,'/images/animal/Leopard-Cat/2.jpg'),(16,'/images/animal/Leopard-Cat/3.jpg'),(17,'/images/animal/Asian-Black-Bear/1.jpg'),(17,'/images/animal/Asian-Black-Bear/2.jpg'),(17,'/images/animal/Asian-Black-Bear/3.jpg'),(18,'/images/animal/Orangutan/1.jpg'),(18,'/images/animal/Orangutan/2.jpg'),(18,'/images/animal/Orangutan/3.jpg');
/*!40000 ALTER TABLE `animal_animal_img` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-28  1:10:43
