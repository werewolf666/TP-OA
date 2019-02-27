-- phpMyAdmin SQL Dump
-- version 4.0.10.11
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2019-02-27 02:26:13
-- 服务器版本: 5.5.54-log
-- PHP 版本: 5.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `db_oa`
--

-- --------------------------------------------------------

--
-- 表的结构 `sp_dept`
--

CREATE TABLE IF NOT EXISTS `sp_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `pid` int(11) NOT NULL DEFAULT '0',
  `sort` int(11) NOT NULL DEFAULT '50',
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `sp_dept`
--

INSERT INTO `sp_dept` (`id`, `name`, `pid`, `sort`, `remark`) VALUES
(1, '人事部', 0, 1, '这是人事部门'),
(2, '财务部', 0, 22, '负责发工资');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
