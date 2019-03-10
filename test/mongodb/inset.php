<?php
//引入连接
include './connection.php';
//选择数据库,创建
$db=$mongo->test;
//插入数据
$rs=$db->goods->insert(array('name'=>'redhat','msg'=>'i will go to my home'));
$rs=$db->goods->insert(array('name'=>'huawei','price'=>1999,'number'=>20,'area'=>array('bejin','shanghai','shenzhen')));
var_dump($rs);


//修改数据
$rs=$db->goods->update(array('name'=>'huawei'),array('$set'=>array('name'=>'huawei_new')));
var_dump($rs);