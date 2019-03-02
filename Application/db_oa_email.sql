drop table IF EXISTS `sp_email`;
CREATE TABLE `sp_email`(
  `id` int(11) not null auto_increment,
  `from_id` int(11) not null comment '发送者id',
  `to_id` int(11) not null comment '接受者id',
  `title` varchar(50) not null comment '邮件标题',
  `hasfile` smallint(1) default '0' comment '是否包含文件',
  `file` varchar(255) default null comment '附件',
  `filename` varchar(255) default null comment '附件名称',
  `content` text default null comment '内容',
  `addtime` int(11) default null comment '添加时间',
  `isread` smallint(1) default '0' comment '是否已阅读',
  primary key(`id`)
)engine=mysiam auto_increment=1 default charset=utf8;