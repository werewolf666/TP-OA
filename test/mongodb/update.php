<?php
//引入连接
include './connection.php';
//选择数据库,创建
$db=$mongo->test;

//修改数据
$rs=$db->goods->update(array('name'=>'huawei'),array('$set'=>array('name'=>'huawei_new')));
var_dump($rs);