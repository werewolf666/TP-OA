<?php
/**
 * 公共类控制器，主要实现登陆判断使用，作为继承连继承
 */

namespace Admin\Controller;
use Think\Controller;
class CommonController extends Controller{
    //检测是否登陆
//    //php内置的
//    public function __construct(){
//        //构造父类
//        parent::__construct();
//        //编写判断用户是否登陆
//    }

    //由think PHP提供的构造方法_initialize(){}
    public function _initialize(){
        //编写判断用户是否登陆
        $session=session('id');
        if (empty($session)){
            //没有登陆
//            $this->error('请先登陆...',U('Public/login'),2);exit;
            //编写JavaScript代码
            $url=U('Public/login');
            echo "<script>top.location.href='$url'</script>";exit;
        }
        //获取权限role_id
        $role_id=session('role_id');
        //使用C方法获取权限配置
        $rbac_role_auths=C('RBAC_ROLE_AUTHS');//获取全部用户组信息
        $currRoleAuth=$rbac_role_auths[$role_id];//获取当前用户的权限组
        //通过常量获取当前控制器和方法名字
        $controller=strtolower(CONTROLLER_NAME);//当前控制器名字
        $action=strtolower(ACTION_NAME);//当前方法名
        //判断用户权限,超级管理员不用判断
        if ($role_id>1){
            //非管理员判断流程
            if (!in_array($controller.'/'.$action,$currRoleAuth) && !in_array($controller.'/*',$currRoleAuth)){
                $this->error('您没有权限',U('Index/home'),1);exit;
            }
        }
    }
}