<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/3/9
 * Time: 14:36
 * redis的持久化功能：为了本身数据的安全和完整性，会将数据同步到硬盘。
 */

//连接redis
$redis = new Redis();
$host='127.0.0.1';
$port=6379;
$conn=$redis->connect($host,$port);

//方法1：基于快照的方式：redis会按照一定周期内把数据存储在磁盘中。
//修改redis.conf
//save 900 1
//save 300 10
//save 60 10000
$redis->set('name','asion');
$redis->bgsave();//手动将数据存在磁盘,防止断电时候数据丢失



//方法2：基于日志文件的追加：redis会把redis对数据造成更改的命令记录到日志文件中，在每一次重启的时候，重新执行日志里面redis的写操作，达到还原数据的目的
//第一步，修改redis.conf
//appendonly yes
