<?php
/**
 * 主要是操作redis的
 */

//连接redis
$redis = new Redis();
$host='127.0.0.1';
$port=6379;
$conn=$redis->connect($host,$port);
$redis->set('windows','windows testing');
$data=$redis->get('windows');
echo $data;

