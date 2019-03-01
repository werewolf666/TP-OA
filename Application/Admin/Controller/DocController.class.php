<?php
namespace Admin\Controller;
use \Think\Controller;
class DocController extends Controller{
    //showList
    public function showList(){
        $model=M('Doc');
        $data=$model->select();
        $this->assign('data',$data);
        //展示模板
        $this->display();
    }

    //add方法
    public function add(){
        if (IS_POST){
            $data=I('post.');
            $data['addtime']=time();
//            $file=$_FILES['file'];
//            dump($file);die();
            $model=D('Doc');
            $result=$model->saveData($data,$_FILES['file']);
            if ($result){
                $this->success('添加成功',U('showList'),1);
            }else{
                $this->error('添加失败','',1);
            }
        }else{
            //展示模板
            $this->display();
        }
    }

    //下载download方法
    public function download(){
        //接受id
        $id=I('get.id');
        $data=M('Doc')->find($id);
        //下载代码
        $file = WORKING_PATH . $data['filepath'];
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
        $data=M('Doc')->find($id);
        //输出内容,还原被转义的内容
        $data=htmlspecialchars_decode($data['content']);
        echo $data;
    }

}