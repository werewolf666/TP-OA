-- phpMyAdmin SQL Dump
-- version 4.0.10.11
-- http://www.phpmyadmin.net
--
-- 主机: 127.0.0.1
-- 生成日期: 2019-03-02 03:28:46
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
-- 表的结构 `sp_doc`
--

CREATE TABLE IF NOT EXISTS `sp_doc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL COMMENT '公文标题',
  `filepath` varchar(255) DEFAULT NULL COMMENT '附件存在路劲',
  `filename` varchar(255) DEFAULT NULL COMMENT '附件原名',
  `hasfile` smallint(1) DEFAULT '0' COMMENT '是否存在附件',
  `content` text COMMENT '公文内容',
  `author` varchar(40) NOT NULL COMMENT '作者',
  `addtime` int(11) DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `sp_doc`
--

INSERT INTO `sp_doc` (`id`, `title`, `filepath`, `filename`, `hasfile`, `content`, `author`, `addtime`) VALUES
(1, '公司架构调整', NULL, NULL, 0, '减去策划部', 'gatsby', NULL),
(2, '公司结构', NULL, NULL, 0, '展示公司结果', 'gatsby', 1551453203),
(3, '小米9的抢购', NULL, NULL, 0, '&lt;p&gt;愿你抢购半生，归来仍是无货！&lt;/p&gt;&lt;p&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;by 小米集团CEO 雷军&lt;br/&gt;&lt;/p&gt;', '雷军', 1551457932),
(4, '华为手机真贵', '/Public/Uploads/2019-03-02/5c796d0426de0.cmd', 'cmd.cmd', 1, '&lt;p&gt;华为手机这几年涨价真快&lt;br/&gt;&lt;/p&gt;', '余承东', 1551461635),
(5, '增加PHP面试技能', '/Public/Uploads/2019-03-02/5c796e5c66964.cmd', 'cmd.cmd', 1, '&lt;p&gt;本章节主要介绍PHP面试技巧&lt;br/&gt;&lt;/p&gt;', 'Gatsby', 1551461979),
(6, '小米手机的饥饿营销', '/Public/Uploads/2019-03-02/5c79876ba8313.jpeg', 'pexels-photo.jpeg', 1, '&lt;p&gt;康熙师爷&amp;nbsp;营销最前线&lt;/p&gt;&lt;p&gt;营销中有一个术语叫：饥饿营销。&lt;/p&gt;&lt;p&gt;你肯定知道。&lt;/p&gt;&lt;p&gt;可能还策划过一场饥饿营销，效果……或许没有乔布斯的好。&lt;/p&gt;&lt;p&gt;不过，先不谈案例，我更想问你一个问题：&lt;/p&gt;&lt;p&gt;饥饿营销的方法是什么？&lt;/p&gt;&lt;p&gt;我猜你答对了，答案就是：饥饿。限量供应，让用户饥饿。&lt;/p&gt;&lt;p&gt;好，我再问你第二个问题：&lt;/p&gt;&lt;p&gt;饥饿营销=限量供应吗？&lt;/p&gt;&lt;p&gt;这个……好像有点不对劲。&lt;/p&gt;&lt;p&gt;说对吧，因为不管是大公司，还是小公司，他们的饥饿营销方案都在说限量供应。&lt;/p&gt;&lt;p&gt;说不对吧，因为明明限量供应了，甚至照抄别人的方案，营销效果却不一样。&lt;/p&gt;&lt;p&gt;那么，问题到底出在哪呢？&lt;/p&gt;&lt;p&gt;今天笔者就来和你聊聊这个：&lt;/p&gt;&lt;p&gt;真正的饥饿营销，其实是在限量供应的背后，制造了一个隐形战场。&lt;/p&gt;&lt;p&gt;这个隐形战场，才是大多数人没有get到的关键点。&lt;/p&gt;&lt;p&gt;&lt;img src=&quot;/ueditor/php/upload/image/20190302/1551468386612342.png&quot; title=&quot;1551468386612342.png&quot; alt=&quot;TIM截图20180515162725.png&quot;/&gt;&lt;/p&gt;', 'Gatsby', 1551468394);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
