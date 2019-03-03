<?php
namespace Admin\Controller;
class DocController extends CommonController{
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

    //编辑公文方法
    public function edit(){
        if(IS_POST){
            $model=new DocModel();
            $data = $model->create();//可以传参可以不传,不传就使用对象的值
            if (!$data){
                //输出错误提示
                //dump($model->getError());die;
                $this->error($model->getError());exit;}
            //实例化映射记录
            //获取上传文件
            $file=$_FILES['file'];
            $result=$model->updateData($data,$file);
            if ($result!==false){
                $this->success('修改成功',U('showList'),1);exit;
            }else {
                $this->error('修改失败', '',1);exit;
            }
        }else{
            $model=M('Doc');
            //接受id
            $id=I('get.id');
            $data=$model->find($id);
//        //输出内容,还原被转义的内容
//        $data=htmlspecialchars_decode($data['content']);
            $this->assign('data',$data);
            $this->display();
        }

    }

}