CREATE DATABASE  IF NOT EXISTS `filmoo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `filmoo`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: filmoo
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`categoryid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Bollywood'),(2,'Hollywood'),(3,'Anime'),(4,'K-Drama');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `genres` (
  `genreid` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(50) NOT NULL,
  PRIMARY KEY (`genreid`),
  UNIQUE KEY `genre` (`genre`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action'),(2,'Adventure'),(3,'Animation'),(4,'Biography'),(5,'Comedy'),(6,'Crime'),(7,'Documentary'),(8,'Drama'),(9,'Family'),(10,'Fantasy'),(11,'Historical'),(12,'Horror'),(13,'Music'),(14,'Mystery'),(15,'Romance'),(16,'Sci-Fi'),(17,'Sport'),(18,'Thriller'),(19,'War'),(20,'Western');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `languages` (
  `languageid` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(50) NOT NULL,
  PRIMARY KEY (`languageid`),
  UNIQUE KEY `language` (`language`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (8,'Chinese'),(2,'English'),(5,'Gujarati'),(1,'Hindi'),(7,'Japanese'),(6,'Marathi'),(3,'Tamil'),(4,'Telugu');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `movie` (
  `movieid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `name` text,
  `language` text,
  `year` varchar(45) DEFAULT NULL,
  `image` text,
  `screenshot` text,
  `genre` text,
  `description` text,
  `quality` varchar(45) DEFAULT NULL,
  `link480p` text,
  `link720p` text,
  `link1080p` text,
  `link4k` text,
  `size480p` varchar(45) DEFAULT NULL,
  `size720p` varchar(45) DEFAULT NULL,
  `size1080p` varchar(45) DEFAULT NULL,
  `size4k` varchar(45) DEFAULT NULL,
  `title` text,
  `zip` text,
  `eplinks` text,
  `numberep` text,
  `content` varchar(45) DEFAULT NULL,
  `numberOfSeasons` int(11) DEFAULT '0',
  `updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`movieid`),
  KEY `mi_ci_fk_idx` (`categoryid`),
  CONSTRAINT `mi_ci_fk` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (16,3,'Demon Slayer: Kimetsu no Yaiba','English, Japanese, Hindi','2019','34bb3282-6c3a-49ad-ae0d-4b3764f28cf0.jpeg','d8b3df84-e349-4004-905f-930ef55be936.jpeg,b1005e06-01cb-4fc2-99b4-4dd792bf0dc9.jpeg,1cdd5ab6-86ac-4e42-ab24-b03cd7aa562b.jpeg','Adventure, Action, Family, Crime, Comedy','Demon Slayer: Kimetsu no Yaiba is a Japanese anime and manga series that follows Tanjiro Kamado, a kindhearted boy whose family is slaughtered by demons, with his younger sister Nezuko being the sole survivor but turned into a demon herself. Determined to find a cure for Nezuko and avenge his family, Tanjiro joins the Demon Slayer Corps, a secret organization dedicated to hunting demons. Alongside friends like Zenitsu and Inosuke, he faces powerful demons while uncovering the dark truth behind their existence and the origins of their leader, Muzan Kibutsuji. The story blends emotional depth, breathtaking animation, intense battles, and themes of family, resilience, and compassion.','720P',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Download Demon Slayer: Kimetsu no Yaiba (Season 1 - 4) Complete [Hindi ORG 2.0 + Japanese] ESubs 720p | 1080p WEB-DL',NULL,'[{\"seasonNumber\":1,\"numberOfEpisodes\":1,\"zipLinks\":{\"480P\":\"\",\"720P\":\"\",\"1080P\":\"\",\"4K\":\"\"},\"episodesLinks\":[{\"link480P\":\"https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J\",\"size480P\":\"200MB\",\"link720P\":\"https://drive.google.com/uc?export=download&id=1UQYUSbLbZq4ZiXIomX515ASMK1yrdr5J\",\"size720P\":\"400MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"}]}]','1','series',1,'2025-08-18 05:17:24'),(20,1,'Raone','Hindi','2011','b78aa80c-076e-48bb-a39a-5443d1b7c113.jpeg','5f6fe177-1ca8-4747-b979-178863eb582c.jpeg,f2542e82-0c6e-41c2-a72a-1515485f8181.jpeg,8538278c-0591-45e4-bba4-5fc7a3fca50e.jpeg','Action, Adventure, Sci-Fi','A father is his child’s best superhero. Shekhar, after facing criticism from his son, tries to make him feel happy by creating a game in which the villain is comparatively more powerful than the hero. This is what his son exactly wants. Shekhar even gives his face to the game’s hero, G.One. He however keeps on ignoring the issues in the game, but knows little that the game would turn out to be deadly. Ra.One, the villain, using a device invented by Shekhar’s friend and colleague, Jenny, comes out of the game and starts to search for Lucifer, who is none other than Prateek. The lives of everyone turn upside down, when one small imagination turns out to be something that can’t be imagined.','1080P','https://vcloud.lol/116khszqdgt28t6','https://vcloud.lol/onkbpyybrmuyd9i','https://vcloud.lol/rrr4t4uvm0tplwx',NULL,'400MB','700MB','1.1GB',NULL,'Download Ra.One (2011) BluRay Hindi',NULL,NULL,NULL,'movie',NULL,'2025-08-18 05:17:24'),(22,2,'Wednesday','Hindi, English','2022','b8cbfaa4-e8bc-4605-a36b-503de47b6365.jpeg','94162bc2-1684-458f-ad42-f1236ba2fca7.jpg,6ec4e6b7-c17a-4ba2-b775-4aeea12477c5.jpg,3f4ef125-e6cb-48af-98d0-2b9d11b46185.jpg,63bdae37-3139-460a-87b7-4e93f721aed7.jpg','Sci-Fi, Horror, Fantasy, Mystery, Comedy, Drama','Wednesday is a supernatural mystery-comedy series created by Alfred Gough and Miles Millar, streaming on Netflix since November 23, 2022. Centered on Wednesday Addams from The Addams Family, the show stars Jenna Ortega as the gothic, deadpan teenager navigating life at Nevermore Academy, a school for outcasts, while investigating a string of murders linked to her family\'s past. Blending dark humor, coming-of-age drama, and mystery, the series became a massive hit, praised for Ortega’s performance, Tim Burton’s signature gothic direction, and its viral dance scene, and it was renewed for a second season.','1080P',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Download Wednesday (2022) Season 1 Dual Audio {Hindi-English} Netflix Original 480p I 720p | 1080pWEB-DL','https://vcloud.lol/dtzkdkpphjjetcb','[{\"seasonNumber\":1,\"numberOfEpisodes\":8,\"zipLinks\":{\"480P\":\"https://vcloud.lol/ksf1po3ixfaoi2o\",\"720P\":\"https://vcloud.lol/dtzkdkpphjjetcb\",\"1080P\":\"\",\"4K\":\"\"},\"episodesLinks\":[{\"link480P\":\"https://vcloud.lol/exd_1dguw10vdg_\",\"size480P\":\"197 MB\",\"link720P\":\"https://vcloud.lol/1ummaeu_baqe1b1\",\"size720P\":\"535 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/1b4ot41pz0o7xzd\",\"size480P\":\"162 MB\",\"link720P\":\"https://vcloud.lol/yhranhhpr3e1yrg\",\"size720P\":\"440 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/_ltd5o58_aaq6kc\",\"size480P\":\"163 MB\",\"link720P\":\"https://vcloud.lol/xfjnvd-vy8v8xuu\",\"size720P\":\"437 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/x8qc4cxekffge_3\",\"size480P\":\"165 MB\",\"link720P\":\"https://vcloud.lol/ridinfxvhczd1m1\",\"size720P\":\"448 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/1h89492qegkg4kx\",\"size480P\":\"173 MB\",\"link720P\":\"https://vcloud.lol/11_d3ig_n1xa9n8\",\"size720P\":\"470 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/4twftm4q4ofbmxv\",\"size480P\":\"166 MB\",\"link720P\":\"https://vcloud.lol/0bv8a3xfowri3yw\",\"size720P\":\"453 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/4m82ethufnujlx1\",\"size480P\":\"157 MB\",\"link720P\":\"https://vcloud.lol/gf411piatzarb4t\",\"size720P\":\"427 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/dtin74tukd57bti\",\"size480P\":\"173 MB\",\"link720P\":\"https://vcloud.lol/rauprb_fjvj2jna\",\"size720P\":\"471 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"}]}]','8','series',1,'2025-08-18 05:17:24'),(23,1,'Badla','Hindi','2019','17752d9c-4893-491b-870f-a313f3fe2ebc.jpeg','0889108e-b043-4df7-a3c1-a577edbb0ce5.png,7f5eaafa-dfeb-45fe-a1e1-34ce9da713fe.jpeg,ee871fe2-bec9-404c-a6cc-17048df38f4d.jpeg','Crime, Drama, Mystery','Badla (2019) is an Indian mystery-thriller film directed by Sujoy Ghosh, starring Amitabh Bachchan and Taapsee Pannu. Adapted from the Spanish film The Invisible Guest, it follows Naina Sethi, a successful businesswoman accused of murdering her secret lover, who hires renowned lawyer Badal Gupta to help prove her innocence. Set almost entirely in an intense, dialogue-driven interrogation, the story unfolds through conflicting flashbacks and twists, keeping the audience guessing until the shocking climax reveals the real killer and motive.','1080P','https://vcloud.lol/kc-n-xyy4q1l-fq','https://vcloud.lol/yccja1tr05ixctw','https://vcloud.lol/ammgagovmn-6gun','','350 MB','1 GB','3.4 GB','','Download Badla (2019) Hindi Full Movie 480p [350MB] | 720p [700MB] | 1080p [3.4GB]',NULL,NULL,NULL,'movie',NULL,'2025-08-18 05:17:24'),(25,3,'The Angel Next Door Spoils Me Rotten','Hindi, Japanese','2023','9a75f4bf-5601-456e-aaba-c879d7777173.jpg','3845f6be-24b4-48c3-a54a-7ca257f48046.png,39b8a27a-c9d4-411f-b3be-9b6457b13fda.png,3f4d80bd-a6c0-4891-9cd9-ff6372a67bd7.png','Animation, Romance, Comedy','The Angel Next Door Spoils Me Rotten is a heartwarming romantic comedy about Amane Fujimiya, an ordinary high school boy, and his beautiful classmate Mahiru Shiina, who is known as the “angel” of their school for her looks and kindness. Despite sitting next to each other in class, they barely interact until one rainy day when Amane lends Mahiru his umbrella. This small act of kindness brings them closer, and soon Mahiru begins helping Amane with his messy lifestyle, cooking meals for him and tidying up his home. As they spend more time together, their bond deepens into a sweet and wholesome romance, showing how love can blossom through everyday acts of care and understanding.','1080P',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Download The Angel Next Door Spoils Me Rotten (2023 Anime Series) Season 1 Complete Dual-Audio [Hindi Dubbed -Japanese] 720p 1 1080p WEB-DL','https://vcloud.lol/22rxvpe4ygy3bge','[{\"seasonNumber\":1,\"numberOfEpisodes\":12,\"zipLinks\":{\"480P\":\"\",\"720P\":\"\",\"1080P\":\"https://vcloud.lol/22rxvpe4ygy3bge\",\"4K\":\"\"},\"episodesLinks\":[{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/ppcw1pq_mgsxyjc\",\"size1080P\":\"163 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://new25.gdtot.dad/file/214545345\",\"size1080P\":\"204 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/cl3oqucoiuhzg00\",\"size1080P\":\"177 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/kn-aku--cgewb0x\",\"size1080P\":\"173 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/pssc8zznewjeur8\",\"size1080P\":\"175 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/1lsiowt-5pisprn\",\"size1080P\":\"166 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/7chnllqsncclq8q\",\"size1080P\":\"171 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/anoggrkfwg-drui\",\"size1080P\":\"152 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/nuu7n1cpaaoj3n1\",\"size1080P\":\"163 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/vshjlkfwrkdjl5j\",\"size1080P\":\"160 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/1--1w--ewa_eet6\",\"size1080P\":\"164 MB\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"\",\"size480P\":\"\",\"link720P\":\"\",\"size720P\":\"\",\"link1080P\":\"https://vcloud.lol/1corzby0ucrrtl1\",\"size1080P\":\"180 MB\",\"link4k\":\"\",\"size4k\":\"\"}]}]','12','series',1,'2025-08-18 06:49:30'),(26,4,'Train to Busan','Hindi, English','2016','afde534b-5f48-46bc-b066-b4473c590d7a.jpg','4891e47d-3493-4dee-b2f5-dceae238e84c.jpg,8438ad7e-cac8-4de9-b7f2-7d7751dc7d86.jpg,fde286ff-6ea0-4991-878a-4f973162a381.jpg,e04b29e8-f6d1-4876-9757-40b10c328a14.jpg','Action, Horror, Thriller','Train to Busan is a gripping South Korean action-horror film that follows the story of Seok-woo, a workaholic father, who boards a train to Busan with his young daughter Su-an. Their seemingly ordinary journey quickly turns into a desperate fight for survival when a fast-spreading zombie outbreak engulfs the train. As passengers are trapped inside the speeding train with the infected, chaos and fear erupt, forcing people to confront their humanity, selfishness, and courage. Blending intense action with emotional depth, the film highlights themes of sacrifice, family bonds, and the struggle to hold onto hope in the face of overwhelming despair.','1080P','https://vcloud.lol/n9iiwdm5hmuuhwu','https://vcloud.lol/b2bega7e6hm60r0','https://vcloud.lol/jehz1zjl1pjf1zz','','450 MB','1 GB','2.5 GB','null','Download Train to Busan (2016) Dual Audio {Hindi-English} 480p [450MB] | 720p [1 GB] I 1080p [2.5GB]',NULL,NULL,NULL,'movie',NULL,'2025-08-18 07:50:08'),(27,1,'Avengers: Endgame','Hindi, English','2019','6e33b1f6-82d5-4c0e-8c64-635e547d0849.jpg','a93c16ac-e63f-4240-8fdd-5367765aba3b.jpeg,9b0fe249-80ed-4216-ae90-5ba74737d3db.jpeg,b6676610-2476-42d6-838f-bdee1dfb40c6.jpeg,90b91cc8-0816-414f-b531-6c8985549bae.jpeg','Action, Adventure, Fantasy','Avengers: Endgame is an epic superhero film that serves as the emotional conclusion to over a decade of interconnected Marvel stories. Set after the devastating events of Infinity War, where Thanos wiped out half of all life, the surviving Avengers come together to undo the destruction and bring back their loved ones. The film combines thrilling action with heartfelt moments as the heroes face their greatest challenge, risking everything in a final battle to restore balance to the universe. With themes of sacrifice, unity, and hope, Endgame delivers an unforgettable cinematic experience, marking both an ending and a new beginning for the Marvel saga.','4K','https://vcloud.lol/sepiqm8zv2v7z7y','https://vcloud.lol/1va-uxqho1mrzsw','https://vcloud.lol/grr12biuhoue1m_','https://vcloud.lol/bycxgtppyxcefne','585 MB','1.7 GB','4.2 GB','7.7 GB','Download Avengers: Endgame (2019) Dual Audio {Hindi-English} 480p [500MB] | 720p [1.7GB] | 1080p [4.3GB] | 2160p4K',NULL,NULL,NULL,'movie',NULL,'2025-08-18 07:41:53'),(28,3,'The Garden of Words','English, Japanese','2013','30bf666b-f803-4d25-a2e1-7623affe2e9f.jpg','7846d7b0-6f46-4958-a6b7-86d115c86904.jpeg,b6a008d3-eaa0-4e3b-9ff6-2c71cec6ed56.jpeg,59076152-e8dc-4f45-aaa6-1666e6f7c9a6.jpeg,e7d3a01d-b260-4c8c-ae39-950a909ce273.jpeg','Animation, Drama, Romance','The Garden of Words is a beautifully crafted Japanese animated film by Makoto Shinkai that explores themes of loneliness, connection, and unspoken emotions. It follows Takao, a high school student who dreams of becoming a shoemaker, and Yukino, a mysterious older woman, who often meet by chance in a quiet garden on rainy mornings. As the two continue to cross paths, they find comfort and understanding in each other’s presence, even though their lives are on different paths. With breathtaking visuals, poetic storytelling, and a delicate exploration of human relationships, the film captures the fleeting beauty of unexpected bonds and the healing power of companionship.','1080P','https://vcloud.lol/lbuggoulz3l-gts','https://vcloud.lol/bot5xg1llb4clmn','https://vcloud.lol/flsss6v2v0lirsw','null','150 MB','415 MB','1.7 GB','null','The Garden of Words (2013) WEB-DL English Dubbed [ORG] 1080p 720p HD | [Anime Movie]',NULL,NULL,NULL,'movie',NULL,'2025-08-18 07:51:36'),(29,4,'A Taxi Driver','Hindi','2017','0bc3dfc1-2bde-42ef-a29c-79ebb21e6829.png','edcc38be-64d9-4b7e-9f9c-3817b5105080.jpg,9cbb6473-1ea3-4ed1-a5b7-520106115345.jpg,671fa516-398d-467c-b4ad-98d7f252b742.jpg,c7d6a215-0229-4604-b93f-62fa4b3f16e9.jpg','Action, Historical, Drama','ChatGPT said:  A Taxi Driver is a powerful South Korean historical drama inspired by true events during the Gwangju Uprising of 1980. It follows Kim Man-seob, a struggling Seoul taxi driver, who unknowingly picks up a German journalist, Jürgen Hinzpeter, for a ride to Gwangju. Believing it to be just another fare, Kim soon finds himself caught in the midst of a brutal government crackdown on pro-democracy demonstrators. As he witnesses the suffering and courage of the citizens, his perspective begins to change, and he risks his own life to help reveal the truth to the world. Blending human emotion with historical tragedy, the film highlights the importance of compassion, courage, and the power of ordinary people in extraordinary times.','1080P','https://vcloud.lol/zfifwf91ut6hztj','https://vcloud.lol/xjv8yw0hw6jzxgm','https://vcloud.lol/jv--hyd1ujtvpeh','null','552 MB','1.1 GB','2.7 GB','null','Download A Taxi Driver (2017) BluRay Dual Audio {Hindi-Korean} 480p [550MB] | 720p [1.1 GB] | 1080p [3GB] Full-Movie',NULL,NULL,NULL,'movie',NULL,'2025-08-18 08:19:01'),(30,1,'Shiddat','Hindi','2021','0d50bae9-c22d-4483-a9fd-e0da7db65fd2.jpg','a00020ba-5b07-4e9e-93fa-2e7a05d3b17f.png,ef5619c5-03da-4e1a-8492-9f676f577a02.png,2badb24e-5be0-4690-8130-b9f064dabb4b.png','Romance, Drama','Shiddat is a Hindi romantic drama film that tells the story of Jaggi, a passionate young man who falls deeply in love with Kartika, a woman engaged to someone else. Their love story begins with an intense attraction that grows into an all-consuming desire, making Jaggi determined to cross all boundaries for her. The film beautifully portrays the power of true love, showing how Jaggi risks everything, even his life, to reunite with Kartika. With its emotional depth, soulful music, and themes of passion, sacrifice, and destiny, Shiddat explores how love can inspire people to go to unimaginable lengths.','4K','https://vcloud.lol/iia4zj-qiq3jkjz','https://vcloud.lol/i8miw86x87r8xwj','https://vcloud.lol/6tw61ftjetcf2t6','https://vcloud.lol/itip6idip5rabpd','433 MB','1.2 GB','2.4 GB','22 GB','Download Shiddat (2021) Hindi Full Movie 480p [450MB] | 720p [1.2GB] | 1080p [2.4GB] | 2160 4K',NULL,NULL,NULL,'movie',NULL,'2025-08-18 07:28:59'),(31,4,'Squid Game','English, Hindi','2021','b8332971-76c9-402e-b31a-e231cbd595c0.jpeg','1dd8d0d9-3306-4470-a3ed-6208de4bc44d.jpg,e9c2812d-3b18-49d4-87d5-ae2e856d2efb.jpg,cfb981a2-78e7-4c0f-acca-84913aff0c9a.jpg,e5fc6f2a-17f3-4d6e-b865-d57a8706b280.jpg','Action, Adventure, Drama, Mystery, Thriller','“Squid Game” is a South Korean survival drama series that follows a group of financially struggling individuals who are invited to participate in a mysterious competition of childhood games, with the promise of winning a massive cash prize. However, the games come with a deadly twist—losing means death—forcing contestants to risk their lives for money while exposing the extremes of human desperation, greed, and morality. Through its gripping storyline, striking visuals, and social commentary on inequality, the series delivers both intense suspense and a chilling reflection of modern society.','720P',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Download Squid Game (Season 1) Complete Dual-Audio {Hindi-English} Netflix Series 480p I 720p 1 1080p WEB-DL','https://vcloud.lol/mplalm7616sapif','[{\"seasonNumber\":1,\"numberOfEpisodes\":9,\"zipLinks\":{\"480P\":\"https://vcloud.lol/-1dlalbusuzsrub\",\"720P\":\"https://vcloud.lol/mplalm7616sapif\",\"1080P\":\"\",\"4K\":\"\"},\"episodesLinks\":[{\"link480P\":\"https://vcloud.lol/iyb0zsyyo14hhh4\",\"size480P\":\"181 MB\",\"link720P\":\"https://vcloud.lol/l_gq9-ty9xxqx_2\",\"size720P\":\"635 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/mu8fnsmdfivj03u\",\"size480P\":\"189 MB\",\"link720P\":\"https://vcloud.lol/yh3bqxslymllsau\",\"size720P\":\"665 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/k31k8ivipwosz8a\",\"size480P\":\"167 MB\",\"link720P\":\"https://vcloud.lol/clmfd2ac-ga_tel\",\"size720P\":\"574 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/i9riuiyniiku0-n\",\"size480P\":\"166 MB\",\"link720P\":\"https://vcloud.lol/w9vi9fha9wivwg1\",\"size720P\":\"583 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/spmsmhsel33oj3j\",\"size480P\":\"156 MB\",\"link720P\":\"https://vcloud.lol/v-vcvebfvfnjhzq\",\"size720P\":\"548 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/wx3rvqneqoeouon\",\"size480P\":\"187 MB\",\"link720P\":\"https://vcloud.lol/mo31devvgoedzsv\",\"size720P\":\"655 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/37p6bssaf96lbgj\",\"size480P\":\"176 MB\",\"link720P\":\"https://vcloud.lol/ojatmjou3gucxco\",\"size720P\":\"616 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/j621oro4oqoqbq6\",\"size480P\":\"97 MB\",\"link720P\":\"https://vcloud.lol/faa11fymi1gfgq1\",\"size720P\":\"342 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"},{\"link480P\":\"https://vcloud.lol/k7vseotkk9esfvg\",\"size480P\":\"168 MB\",\"link720P\":\"https://vcloud.lol/crwehcbwcpwyrac\",\"size720P\":\"589 MB\",\"link1080P\":\"\",\"size1080P\":\"\",\"link4k\":\"\",\"size4k\":\"\"}]}]','9','series',1,'2025-08-18 05:17:24');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'filmoo'
--

--
-- Dumping routines for database 'filmoo'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-30 18:29:20
