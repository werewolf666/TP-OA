create database db_oa;
use db_oa;
create table sp_dept(
id int not null auto_increment,
name varchar(50) not null,
pid int not null default 0,
sort int not null default 50,
remark varchar(255),
primary key(id)
)engine=myisam default charset=utf8;