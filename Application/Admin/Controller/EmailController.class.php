<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/3/3
 * Time: 2:31
 */
namespace Admin\Controller;
use Think\Controller;
class EmailController extends Controller{
    //发送邮件
    public function send(){
        if (IS_POST){
            //处理数据
            $data=I('post.');
            $model=D('Email');
            $result=$model->saveData($data,$_FILES['file']);
            if ($result){
                $this->success('发送成功',U('sendBox'),1);
            }else{
                $this->error('发送失败','',1);
            }
        }else{
            //查询收件人信息
            $model=M('User');
            $data=$model->field('id,truename')->where("id !=" .session('id'))->select();
            //传递数据
            $this->assign('data',$data);
            //显示模板
            $this->display();
        }
    }

    //获取发件箱的sendBox,当前用户的发件信息
    public function sendBox(){
        //连表查询
        /**
         * 从表 sp_user(t1),主表sp_email(t2)
         * sql="select t1.*,t2.truename as truename from sp_email as t1 left join sp_user as t2 on t1.to_id=t2.id where t1.from_id=当前用户id"
         */
        $id=session('id');
        $data=M('Email')->field('t1.*,t2.truename as truename')
            ->alias('t1')
            ->join('left join sp_user as t2 on t1.to_id=t2.id')
            ->where('t1.from_id='.$id)
            ->select();
        $this->assign('data',$data);
        $this->display();
    }

    //下载download方法
    public function download(){
        //接受id
        $id=I('get.id');
        $data=M('Email')->find($id);
        //下载代码
        $file = WORKING_PATH . $data['file'];
        //输出文件
        header("Content-type: application/octet-stream");
        header('Content-Disposition: attachment; filename="' . basename($file) . '"');
        header("Content-Length: ". filesize($file));
        //输出缓冲区
        readfile($file);
    }

    //查看文档showContent方法 供layer使用
    public function showContent(){
        //接受id
        $id=I('get.id');
        $data=M('Email')->find($id);
        //输出内容,还原被转义的内容
        $data=htmlspecialchars_decode($data['content']);
        echo $data;
    }

    //定义空操作方法
    public function _empty(){
         echo '没有'.ACTION_NAME.'方法';
    }
}