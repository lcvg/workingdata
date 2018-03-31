/*
Navicat MySQL Data Transfer

Source Server         : Mydata
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : datamanagement

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2018-03-31 18:59:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_authority
-- ----------------------------
DROP TABLE IF EXISTS `t_authority`;
CREATE TABLE `t_authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `authorityCode` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_awardrecords
-- ----------------------------
DROP TABLE IF EXISTS `t_awardrecords`;
CREATE TABLE `t_awardrecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `awardContent` varchar(32) NOT NULL,
  `awardLevel` varchar(16) NOT NULL,
  `awardDate` date NOT NULL,
  `state` varchar(4) NOT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `name` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_buildproject
-- ----------------------------
DROP TABLE IF EXISTS `t_buildproject`;
CREATE TABLE `t_buildproject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` varchar(8) NOT NULL,
  `projectName` varchar(32) NOT NULL,
  `buildDate` date NOT NULL,
  `teachingMethod` varchar(8) NOT NULL,
  `major` varchar(16) NOT NULL,
  `state` varchar(4) DEFAULT NULL,
  `jobNumber` varchar(10) DEFAULT NULL,
  `name` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_config
-- ----------------------------
DROP TABLE IF EXISTS `t_config`;
CREATE TABLE `t_config` (
  `id` tinyint(4) NOT NULL,
  `beginDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for t_data
-- ----------------------------
DROP TABLE IF EXISTS `t_data`;
CREATE TABLE `t_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataId` varchar(64) NOT NULL,
  `dataType` varchar(2) NOT NULL,
  `owner` varchar(10) NOT NULL,
  `ownerName` varchar(8) NOT NULL,
  `dataName` varchar(228) NOT NULL,
  `dataPath` varchar(228) NOT NULL,
  `recordId` int(11) NOT NULL,
  `uploadDate` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_department
-- ----------------------------
DROP TABLE IF EXISTS `t_department`;
CREATE TABLE `t_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depId` varchar(8) DEFAULT NULL,
  `depName` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for t_guiderecord
-- ----------------------------
DROP TABLE IF EXISTS `t_guiderecord`;
CREATE TABLE `t_guiderecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `competitionName` varchar(32) NOT NULL,
  `competitionType` varchar(16) NOT NULL,
  `studentName` varchar(8) NOT NULL,
  `studentNumber` varchar(10) NOT NULL,
  `studentType` varchar(6) NOT NULL,
  `studentClass` varchar(16) NOT NULL,
  `guideDate` date NOT NULL,
  `state` varchar(4) NOT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `name` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_log
-- ----------------------------
DROP TABLE IF EXISTS `t_log`;
CREATE TABLE `t_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operator` varchar(10) NOT NULL,
  `operatorName` varchar(8) NOT NULL,
  `step` varchar(16) NOT NULL,
  `operationTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=857 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_notice
-- ----------------------------
DROP TABLE IF EXISTS `t_notice`;
CREATE TABLE `t_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) CHARACTER SET utf32 NOT NULL,
  `content` mediumtext CHARACTER SET utf8 NOT NULL,
  `department` text CHARACTER SET utf8 NOT NULL,
  `createDate` datetime NOT NULL,
  `state` varchar(1) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for t_permission
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission` (
  `id` int(11) NOT NULL,
  `roleId` varchar(6) NOT NULL,
  `permissionName` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_projectassess
-- ----------------------------
DROP TABLE IF EXISTS `t_projectassess`;
CREATE TABLE `t_projectassess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(32) NOT NULL,
  `projectId` varchar(16) NOT NULL,
  `assessMode` varchar(8) NOT NULL,
  `assessDate` date NOT NULL,
  `state` varchar(4) NOT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `name` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` varchar(6) NOT NULL,
  `roleName` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_teacher
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher`;
CREATE TABLE `t_teacher` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `department` varchar(8) NOT NULL,
  `professionalTitle` varchar(8) NOT NULL,
  `duty` varchar(16) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `permission` varchar(6) NOT NULL,
  `password` varchar(40) NOT NULL,
  `buildProject` int(11) DEFAULT '0',
  `records` int(11) DEFAULT '0',
  `textBook` int(11) unsigned DEFAULT '0',
  `teacherReform` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_teachingreform
-- ----------------------------
DROP TABLE IF EXISTS `t_teachingreform`;
CREATE TABLE `t_teachingreform` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectId` varchar(16) NOT NULL,
  `projectName` varchar(32) NOT NULL,
  `projectType` varchar(16) NOT NULL,
  `reportTime` date NOT NULL,
  `compere` varchar(8) NOT NULL,
  `projectIntroduce` varchar(200) NOT NULL,
  `state` tinyint(4) NOT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `name` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_textbook
-- ----------------------------
DROP TABLE IF EXISTS `t_textbook`;
CREATE TABLE `t_textbook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `textbook` varchar(16) NOT NULL,
  `type` varchar(16) NOT NULL,
  `isbn` varchar(24) NOT NULL,
  `press` varchar(32) NOT NULL,
  `publishDate` date NOT NULL,
  `compose` varchar(200) NOT NULL,
  `introduce` varchar(200) NOT NULL,
  `state` varchar(4) DEFAULT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `name` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_user_role
-- ----------------------------
DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jobNumber` varchar(24) NOT NULL,
  `roleId` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
