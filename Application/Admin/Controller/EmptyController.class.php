<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/3/3
 * Time: 3:49
 */
namespace Admin\Controller;
use Think\Controller;
class EmptyController extends Controller{
    //定义空方法
    public function _empty(){
        echo 'cuowu';
        $this->display('Empty/error');
    }
}