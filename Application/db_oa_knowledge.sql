drop table IF EXISTS `sp_knowledge`;
CREATE TABLE `sp_knowledge`(
  `id` int(11) not null auto_increment,
  `title` varchar(50) not null comment '标题',
  `thumb` varchar(255) default null comment '缩略图路径',
  `picture` varchar(255) default null comment '原图地址',
  `description` varchar(255) default null comment '描述',
  `content` text comment '内容',
  `author` varchar(50) not null comment '作者',
  `addtime` int(11) default null comment '添加时间',
  primary key(`id`)
)engine=mysiam auto_increment=1 default charset=utf8;