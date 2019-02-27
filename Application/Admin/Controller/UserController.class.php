<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/2/27
 * Time: 21:22
 */
namespace Admin\Controller;
use Think\Controller;
class UserController extends Controller{
    //showList方法
    public function showList(){
        //显示模板
        $this->display();
    }

    //add方法
    public function add(){
        //显示模板
        $this->display();
    }

    //edit方法
    public function edit(){
        //显示模板
        $this->display();
    }
}