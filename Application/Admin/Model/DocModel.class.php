<?php
//DOC 模型
namespace Admin\Model;
use Think\Model;
class DocModel extends Model{

    //保存数据
    public function saveData($data,$file){
        //判断是否有文件上传
        if (!$file['error']){
            //配置上传
            $cfg=array(
                'rootPath'  =>  WORKING_PATH.UPLOAD_ROOT_PATH,
                );
            //实例化上传类
            $upload=new \Think\Upload($cfg);
            $info=$upload->uploadOne($file);
            //dump($info);
            /**
             * array(9) {
            ["name"] => string(7) "cmd.cmd"
            ["type"] => string(10) "text/plain"
            ["size"] => int(112)
            ["key"] => int(0)
            ["ext"] => string(3) "cmd"
            ["md5"] => string(32) "db406418333591f9d3fde9635594d3ca"
            ["sha1"] => string(40) "c5bc8a1b0401ac9d423bb05b1e9265eb15903311"
            ["savename"] => string(17) "5c796a84154ff.cmd"
            ["savepath"] => string(11) "2019-03-02/"
             */
            //文件目录
            $data['filepath']=UPLOAD_ROOT_PATH.$info['savepath'].$info['savename'];
            //文件名称
            $data['filename']=$info['name'];
            //是否有文件
            $data['hasfile']=1;
//            dump($data);die();
            return $this->add($data);
        }

    }

    public function updateData($data,$file)
    {
        //如果有文件则处理文件
        if ($file['error'] == 0) {
            //有文件
            //配置文件数组
            $cfg = array('rootPath' => WORKING_PATH . UPLOAD_ROOT_PATH);
            //实例化上传类
            $upload = new \Think\Upload($cfg);
            //上传
            $info = $upload->uploadOne($file);
            if ($info) {
                //上传成功
                $data['filepath'] = UPLOAD_ROOT_PATH . $info['savepath'] . $info['savename'];
                $data['filename'] = $info['name'];
                $data['hasfile'] = 1;
                $data['addtime'] = time();
                $this->save($data);
            }
        } else {
            //上传失败，只修改部分结果
            $data['addtime'] = time();
            $this->save($data);
        }
    }
}