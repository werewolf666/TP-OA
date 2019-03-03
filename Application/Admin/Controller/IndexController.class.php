<?php
namespace Admin\Controller;
class IndexController extends CommonController{
    //调用home.html
    public function home(){
        //展示模板
        $this->display();
    }

    //index方法
    public function index(){
        //展示模板
        echo session('username');
        $this->display();
    }

    //showList方法
    public function showList(){
        //显示模板
        $this->display();
    }
}