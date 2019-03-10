<?php
//引入连接
include './connection.php';
//选择数据库,创建
$db=$mongo->test;
//查询数据
$rs=$db->goods->find(array('name'=>'huawei'));
$rs=$db->goods->find();
//var_dump($rs);
foreach ($rs as $k=>$v){
    echo $v['name'],'<br/>';
    var_dump($k);
    var_dump($v);
}