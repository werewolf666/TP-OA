<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/3/3
 * Time: 1:02
 */
namespace Admin\Model;
use Think\Model;
class KnowledgeModel extends Model
{
    //保存数据
    public function saveData($data, $file)
    {
        //判断是否有文件上传
        if (!$file['error']) {
            //配置上传
            $cfg = array(
                'rootPath' => WORKING_PATH . UPLOAD_ROOT_PATH,
            );
            //实例化上传类
            $upload = new \Think\Upload($cfg);
            $info = $upload->uploadOne($file);
            /**
             * dump($info);
            ["name"] => string(27) "TIM截图20180526194002.png"
            ["type"] => string(9) "image/png"
            ["size"] => int(143152)
            ["key"] => int(0)
            ["ext"] => string(3) "png"
            ["md5"] => string(32) "527001ef61fbbb729e0457480240d166"
            ["sha1"] => string(40) "2ca1cd129ecbc3413cc1e1b7265e77c6e683de5a"
            ["savename"] => string(17) "5c7ac2f982ab3.png"
            ["savepath"] => string(11) "2019-03-03/"
             */
            if ($info){
                //制作缩略图
                $thumb=new \Think\Image();
                //图片路径
                $path=UPLOAD_ROOT_PATH.$info['savepath'].$info['savename'];
                //打开图片
                $thumb->open(WORKING_PATH .$path);
                //生成缩略图
                $thumb->thumb(100,100);
                //保存图片
                $thumb_path=UPLOAD_ROOT_PATH . $info['savepath'] .'thumb_'.$info['savename'];
                $thumb->save(WORKING_PATH .$thumb_path);
                $data['thumb'] = $thumb_path;
                //文件名称
                $data['picture'] = $path;
            }
        }
        return $this->add($data);
    }


}
