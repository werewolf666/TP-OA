<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends Controller{
    //调用home.html
    public function home(){
        //展示模板
        $this->display();
    }

    //index方法
    public function index(){
        //展示模板
        $this->display();
    }

    //showList方法
    public function showList(){
        //显示模板
        $this->display();
    }
}