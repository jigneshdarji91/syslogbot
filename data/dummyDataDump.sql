-- MySQL dump 10.13  Distrib 5.6.31, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: slackBotLog_db
-- ------------------------------------------------------
-- Server version	5.6.31-0ubuntu0.15.10.1

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
-- Table structure for table `LogInfo`
--

DROP TABLE IF EXISTS `LogInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LogInfo` (
  `server` varchar(256) DEFAULT NULL,
  `log_level` varchar(20) DEFAULT NULL,
  `app` varchar(256) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `log_message` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LogInfo`
--

LOCK TABLES `LogInfo` WRITE;
/*!40000 ALTER TABLE `LogInfo` DISABLE KEYS */;
INSERT INTO `LogInfo` VALUES ('10.10.1.2','ERROR','mysqld','2016-10-18 00:24:56','Oct  17 10:51:24 chaves [ERROR] sshd[19537]: Invalid user admin from spongebob.lab.ossec.net'),('10.10.1.3','ERROR','mysqld','2016-10-18 00:25:26','Oct  17 10:53:24 chaves [ERROR] sshd[12914]: Failed password for invalid user test-inv from spongebob.lab.ossec.net'),('10.10.1.4','ERROR','httpd','2016-10-18 15:27:41','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','ERROR','httpd','2016-10-18 15:27:41','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','ERROR','httpd','2016-10-18 15:27:41','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','ERROR','httpd','2016-10-18 15:27:43','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','ERROR','httpd','2016-10-17 15:30:00','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','ERROR','httpd','2016-10-16 15:30:18','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','ERROR','httpd','2016-10-15 15:30:35','[Wed Oct 11 14:32:52 2000] [error] [client 127.0.0.1] client denied by server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.2','WARNING','mysqld','2016-10-18 15:36:03','Oct  17 10:51:24 chaves [WARNING] sshd[19537]: Secondary Data Missing from spongebob.lab.ossec.net'),('10.10.1.3','WARNING','mysqld','2016-10-18 15:36:03','Oct  17 10:53:24 chaves [WARNING] sshd[12914]: Secondary Data Missing from spongebob.lab.ossec.net'),('10.10.1.2','WARNING','mysqld','2016-10-17 15:36:03','Oct  17 10:51:24 chaves [WARNING] sshd[19537]: Secondary Data Missing from spongebob.lab.ossec.net'),('10.10.1.3','WARNING','mysqld','2016-10-17 15:36:03','Oct  17 10:53:24 chaves [WARNING] sshd[12914]: Secondary Data Missing from spongebob.lab.ossec.net'),('10.10.1.2','WARNING','mysqld','2016-10-16 15:36:03','Oct  17 10:51:24 chaves [WARNING] sshd[19537]: Secondary Data Missing from spongebob.lab.ossec.net'),('10.10.1.3','WARNING','mysqld','2016-10-16 15:36:03','Oct  17 10:53:24 chaves [WARNING] sshd[12914]: Secondary Data Missing from spongebob.lab.ossec.net'),('10.10.1.4','WARNING','httpd','2016-10-18 15:36:03','[Wed Oct 11 14:32:52 2000] [WARNING] [client 127.0.0.1] modifying server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','WARNING','httpd','2016-10-18 15:36:03','[Wed Oct 11 14:32:52 2000] [WARNING] [client 127.0.0.1] modifying server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','WARNING','httpd','2016-10-17 15:36:03','[Wed Oct 11 14:32:52 2000] [WARNING] [client 127.0.0.1] modifying server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','WARNING','httpd','2016-10-17 15:36:03','[Wed Oct 11 14:32:52 2000] [WARNING] [client 127.0.0.1] modifying server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','WARNING','httpd','2016-10-16 15:36:03','[Wed Oct 11 14:32:52 2000] [WARNING] [client 127.0.0.1] modifying server configuration: /export/home/live/ap/htdocs/test'),('10.10.1.4','WARNING','httpd','2016-10-16 15:36:05','[Wed Oct 11 14:32:52 2000] [WARNING] [client 127.0.0.1] modifying server configuration: /export/home/live/ap/htdocs/test');
/*!40000 ALTER TABLE `LogInfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-20 14:27:20
