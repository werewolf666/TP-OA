<?php
/**
 * Public控制器
 */
namespace Admin\Controller;
use Think\Controller;
use Think\Think;

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

    //captcha方法
    public function captcha(){
        //配置
        $cfg=array(
            'fontSize'  =>  12,              // 验证码字体大小(px)
            'useCurve'  =>  false,            // 是否画混淆曲线
            'useNoise'  =>  false,            // 是否添加杂点
            'imageH'    =>  0,               // 验证码图片高度
            'imageW'    =>  0,               // 验证码图片宽度
            'length'    =>  4,               // 验证码位数
            'fontttf'   =>  '4.ttf',              // 验证码字体，不设置随机获取
        );
        //实例化验证码类
        $verify=new \Think\Verify($cfg);
        //输出验证码
        $verify->entry();
    }

    //checkLogin
    public function checkLogin(){
        //接收数据
        $post=I('post.');
//        dump($post);
        //实例化验证码类
        $verify=new \Think\Verify();
        //验证
        $res=$verify->check($post['captcha']);
        if ($res){
            //验证用户名字和密码
            unset($post['captcha']);
            $model=M('User');
            $data=$model->where($post)->find();
            if ($data){
                //保存用户信息
                session('id',$data['id']);
                session('username',$data['username']);
                session('role_id',$data['role_id']);
                //跳转页面
                $this->success('登陆成功',U('Index/index'),2);

            }else{
                $this->error('账号或密码输入错误','',2);
            }

        }else{
            $this->error('验证码输入错误','',2);
        }
    }

    //logout
    public function logout(){
        //清除session
        session(null);
        //跳转
        $this->success('退出成功',U('login'),2);
    }
}