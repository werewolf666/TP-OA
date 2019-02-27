<?php
/**
 * Public控制器
 */
namespace Admin\Controller;
use Think\Controller;
class PublicController extends Controller{
    //展示登录页面
    public function login(){
        //调用展示login模板
        $this->display();
        //获取模板
//        $str=$this->fetch();
//        dump($str);//thinkphp封装的打印方法
//        echo $str;
    }
}