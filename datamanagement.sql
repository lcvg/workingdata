/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : datamanagement

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2018-01-11 21:45:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_authority`
-- ----------------------------
DROP TABLE IF EXISTS `t_authority`;
CREATE TABLE `t_authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_authority
-- ----------------------------

-- ----------------------------
-- Table structure for `t_awardrecords`
-- ----------------------------
DROP TABLE IF EXISTS `t_awardrecords`;
CREATE TABLE `t_awardrecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `awardContent` varchar(32) NOT NULL,
  `awardLevel` varchar(16) NOT NULL,
  `awardDate` date NOT NULL,
  `state` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_awardrecords
-- ----------------------------

-- ----------------------------
-- Table structure for `t_buildproject`
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_buildproject
-- ----------------------------

-- ----------------------------
-- Table structure for `t_data`
-- ----------------------------
DROP TABLE IF EXISTS `t_data`;
CREATE TABLE `t_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dataId` varchar(16) NOT NULL,
  `dataType` varchar(2) NOT NULL,
  `owner` varchar(10) NOT NULL,
  `ownerName` varchar(8) NOT NULL,
  `dataName` varchar(32) NOT NULL,
  `dataPath` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_data
-- ----------------------------

-- ----------------------------
-- Table structure for `t_guiderecord`
-- ----------------------------
DROP TABLE IF EXISTS `t_guiderecord`;
CREATE TABLE `t_guiderecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `competitionName` varchar(32) NOT NULL,
  `competitionType` varchar(16) NOT NULL,
  `studentName` varchar(8) NOT NULL,
  `studentNumber` varchar(10) NOT NULL,
  `guideDate` date NOT NULL,
  `state` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_guiderecord
-- ----------------------------

-- ----------------------------
-- Table structure for `t_log`
-- ----------------------------
DROP TABLE IF EXISTS `t_log`;
CREATE TABLE `t_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `operator` varchar(10) NOT NULL,
  `operatorName` varchar(8) NOT NULL,
  `step` varchar(16) NOT NULL,
  `opetationTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_log
-- ----------------------------

-- ----------------------------
-- Table structure for `t_projectassess`
-- ----------------------------
DROP TABLE IF EXISTS `t_projectassess`;
CREATE TABLE `t_projectassess` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(32) NOT NULL,
  `projectId` varchar(16) NOT NULL,
  `assessMode` varchar(8) NOT NULL,
  `assessDate` datetime NOT NULL,
  `state` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_projectassess
-- ----------------------------

-- ----------------------------
-- Table structure for `t_teacher`
-- ----------------------------
DROP TABLE IF EXISTS `t_teacher`;
CREATE TABLE `t_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(8) NOT NULL,
  `jobNumber` varchar(10) NOT NULL,
  `sex` varchar(1) NOT NULL,
  `department` varchar(8) NOT NULL,
  `professionalTitle` varchar(8) NOT NULL,
  `duty` varchar(16) NOT NULL,
  `phoneNumber` varchar(11) NOT NULL,
  `permission` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_teacher
-- ----------------------------

-- ----------------------------
-- Table structure for `t_teachingreform`
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_teachingreform
-- ----------------------------

-- ----------------------------
-- Table structure for `t_textbook`
-- ----------------------------
DROP TABLE IF EXISTS `t_textbook`;
CREATE TABLE `t_textbook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `textbook` varchar(16) NOT NULL,
  `type` varchar(16) NOT NULL,
  `isbn` varchar(13) NOT NULL,
  `press` varchar(32) NOT NULL,
  `publishDate` date NOT NULL,
  `compose` varchar(200) NOT NULL,
  `introduce` varchar(200) NOT NULL,
  `state` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_textbook
-- ----------------------------