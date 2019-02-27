-- phpMyAdmin SQL Dump
-- version 4.0.10.11
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2019-02-28 02:09:20
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `sp_dept`
--

INSERT INTO `sp_dept` (`id`, `name`, `pid`, `sort`, `remark`) VALUES
(1, '人事部', 0, 1, '这是人事部门'),
(2, '财务部', 0, 22, '负责发工资'),
(7, '技术部', 0, 30, '公司的最重要的部门'),
(6, '总裁办', 0, 20, '这是总裁办办公室'),
(8, '销售部', 0, 30, '管理销售'),
(9, '渠道部', 8, 20, '主管渠道商对接');

-- --------------------------------------------------------

--
-- 表的结构 `sp_user`
--

CREATE TABLE IF NOT EXISTS `sp_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` char(32) NOT NULL,
  `nickname` varchar(40) DEFAULT NULL,
  `truename` varchar(40) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `sex` varchar(10) NOT NULL,
  `birthday` date NOT NULL,
  `tel` varchar(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `addtime` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `sp_user`
--

INSERT INTO `sp_user` (`id`, `username`, `password`, `nickname`, `truename`, `dept_id`, `sex`, `birthday`, `tel`, `email`, `remark`, `addtime`, `role_id`) VALUES
(1, 'admin', '12345', 'admin', '管理员', 1, '男', '2019-02-28', '10000', 'test@qq.com', '北京', 1551288306, 1),
(2, 'admin2', '12345', 'admin2', '管理员2', 2, '男', '2019-02-28', '10002', 'test2@qq.com', '北京2', 1551288306, 2),
(3, 'admin3', '12345', 'admin3', '管理员3', 3, '男', '2019-02-28', '10003', 'test3@qq.com', '北京3', 1551288306, 3),
(4, 'admin4', '12345', 'admin4', '管理员4', 4, '男', '2019-02-28', '10004', 'test4@qq.com', '北京4', 1551288306, 4);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
