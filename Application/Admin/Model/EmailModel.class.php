<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/3/3
 * Time: 2:49
 */
namespace Admin\Model;
use Think\Model;
class EmailModel extends Model{
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
            if ($info){
                //补全表单数据
                $data['from_id']=session('id');
                $data['file']=UPLOAD_ROOT_PATH.$info['savepath'].$info['savename'];
                $data['filename']=$info['name'];
                $data['hasfile']=1;
                $data['isread']=0;
                $data['addtime']=time();
            }
        }else{
           //不上传文件的写入
            //补全表单数据
            $data['from_id']=session('id');
            $data['isread']=0;
            $data['addtime']=time();
        }
        return $this->add($data);
    }

}