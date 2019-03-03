<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/2/27
 * Time: 21:22
 */
namespace Admin\Controller;
class UserController extends CommonController{
    //showList方法
    public function showList(){
        //实例化模型
        $model=M('User');
        //分页显示Page类
        $conut=$model->count();//获取总记录数
        $Page = new \Think\Page($conut,1);
        //定制分页显示模样
        $Page->rollPage=4;
        $Page->lastSuffix=false;
        $Page->setConfig('prev','上一页');
        $Page->setConfig('next','下一页');
        $Page->setConfig('last','末页');
        $Page->setConfig('first','首页');
        //分页显示输出
        $show=$Page->show();
//        dump($Page);die();
//        echo $show;
//        dump($show);die();
        $data=$model->limit($Page->firstRow.','.$Page->listRows)->select();
        //获取部门列表
        $dept_model=M('Dept');
        $dept_list=$dept_model->field('id,name')->select();
        //dump($dept_list);die();
        $this->assign('data',$data);
        $this->assign('show',$show);
        $this->assign('Page',$Page);
        $this->assign('dept_list',$dept_list);
        //显示模板
        $this->display();
    }

    //add方法
    public function add(){
        if (IS_POST){
            $model=M('User');
            $data=$model->create();//可以传参可以不传,不传就使用对象的值
            //添加时间数据
            $data['addtime']=time();
            //dump($data);die();
            //保存到数据表中
            $result=$model->add($data);
            if ($result){
                $this->success('添加成功',U('showList'),1);
            }else{
                $this->error('添加失败','',2);}
        }else{
            //查询部门信息
            $model=M('Dept');
            //获取数据
            $data=$model->field('id,name')->select();
            //传递变量
            $this->assign('data',$data);
            //显示模板
            $this->display();
        }
    }

    //edit方法
    public function edit(){
        //显示模板
        $this->display();
    }

    //charts方法 统计 使用highcharts
    public function charts(){
        //原生sql="select dept.name as deptname,count(*) as count from sp_user as user,sp_dept as dept where user.dept_id=dept.id group by deptname"
        $model=M();
        $data=$model->field('dept.name as deptname,count(*) as count')
            ->table('sp_user as user,sp_dept as dept')
            ->where('user.dept_id=dept.id')
            ->group('deptname')
            ->select();
        //定义字符串数据格式
        /**
         data: [
            ['Shanghai', 24.2],
            ['Beijing', 20.8],
            ['Karachi', 14.9],
            ['Shenzhen', 13.7],
            ['Guangzhou', 13.1],
            ['Istanbul', 12.7],
            ['Mumbai', 12.4],
            ['Moscow', 12.2],
            ['São Paulo', 12.0],
            ['Delhi', 11.7],
            ['Kinshasa', 11.5],
            ['Tianjin', 11.2],
            ['Lahore', 11.1],
            ['Jakarta', 10.6],
            ['Dongguan', 10.6],
            ['Lagos', 10.6],
            ['Bengaluru', 10.3],
            ['Seoul', 9.8],
            ['Foshan', 9.3],
            ['Tokyo', 9.3]
        ]
         */
        $str='[';
        //循环遍历字符串
        foreach ($data as $key=>$value){
           $str.="['".$value['deptname']."',".$value['count']."],";
        }
        //取出最后的逗号
        $str=rtrim($str,',').']'; //[['人事部',3],['公安部',1],['财务部',2]]
        $this->assign('str',$str);
        $this->display();
    }


}