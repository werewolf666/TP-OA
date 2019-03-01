CREATE TABLE IF NOT EXISTS `sp_doc`(
  `id` int(11) not null auto_increment,
  `title` varchar(50) not null comment '公文标题',
  `filepath` varchar(255) default null comment '附件存在路劲',
  `filename` varchar(255) default null comment '附件原名',
  `hasfile` smallint(1) default '0' comment '是否存在附件',
  `content` text comment '公文内容',
  `author` varchar(40) not null comment '作者',
  `addtime` int(11) default null comment '添加时间',
  primary key(`id`)
)engine=myisam auto_increment=1 default charset=utf8;