<?php
/**
 * Created by PhpStorm.
 * User: werewolf
 * Date: 2019/2/26
 * Time: 16:57
 */
namespace Admin\Controller;
use Think\Controller;
class TestController extends Controller{
    //登陆方法
    public function login(){
//        $this->display();
        $this->display('Test/login');
    }

    public function test(){
        echo 'hello world';
    }

    public function test1(){
        //生成当前目录下的index路由url
//        echo U('index');
        $this->display();
    }

    public function test2(){
        //生成制定控制器的路由
        echo U('Index/index');
    }

    public function test3(){
        //生成包含参数的url
        echo U('Home/Index/index',array('id'=>100,'name'=>'tom'));
    }

    public function test4(){
        $this->success('跳转成功',U('test'),1);
    }

    public function test5(){
        echo __SELF__,'<br>';
        echo __ADMIN__,'<br>';
        echo __APP__,'<br>';
    }

    public function test6(){
        //调用注释模板
        $this->display();
    }

    public function test7(){
        //定义一维数组，进行一维数组输出
        $array=array('tom','jack','alex','jum');
        //二维数组
        $array2=array(
            array('tom','jack','alex','jum'),
            array('tom','jack','alex','jum'),
            array('tom','jack','alex','jum')
        );
        //变量分配
        $this->assign('array',$array);
        $this->assign('array2',$array2);
        //显示模板
        $this->display();
    }

    //变量(对象)分配
    public function test8(){
        $stu=new Student();
        //给雷属性复制
        $stu->id=100;
        $stu->name='alex';
        $stu->sex='女';
        //变量分配
        $this->assign('stu',$stu);
        //显示模板
        $this->display();
    }

    //系统变量在模板中的显示
    public function test9(){
//        var_dump($_SERVER);
        $server=$_SERVER;
//        var_dump($server);
        $this->assign('server',$server);
        $this->display();
    }

    //模板中函数的使用
    public function test10(){
        $time = time();
        //定义字符串
        $str='AbcDefG';
        //传递给模板
        $this->assign('time',$time);
        $this->assign('str',$str);
        $this->display();
    }

    //默认值
    public function test11(){
        //定义变量，检测变量是否为空
        $info='';
//        $info=$info?:'这个变量不存在或者为空';
        $this->assign('info',$info);
        $this->display();
    }

    //运算
    public function test12(){
        $a=10;
        $b=2;
        $this->assign('a',$a);
        $this->assign('b',$b);
        $this->display();
    }

    //外部文件导入
    //展示头部文件
    public function head(){
        //显示模板
        $this->display();
    }

    //外部文件导入
    //展示正文文件
    public function body(){
        //显示模板
        $this->display();
    }

    //外部文件导入
    //展示尾部文件
    public function foot(){
        //显示模板
        $this->display();
    }

    //循环遍历
    public function test13(){
        //定义一维数组，进行一维数组输出
        $array=array('tom','jack','alex','jum');
        //二维数组
        $array2=array(
            array('tom','jack','alex','jum'),
            array('tom','jack','alex','jum'),
            array('tom','jack','alex','jum')
        );
        //变量分配
        $this->assign('array',$array);
        $this->assign('array2',$array2);
        //显示模板
        $this->display();
    }

    //if标签
    public function test14(){
        //获取信息
        $date=date('N',time());
        $this->assign('date',$date);
        $this->display();
    }

    //php标签
    public function test15(){
        $this->display();
    }

    //sql调试
    public function test16(){
        $model=M('Dept');
        $data=$model->select();
//        echo $model->getLastSql();//显示最后一条SQL语句 方法1
        echo $model->_sql();//显示最后一条SQL语句 方法2
    }

    //性能调试,G()方法
    public function test17(){
        $model=M('Dept');
        //开始标记
        G('start');
        //代码块
        for ($i=0;$i<100000;$i++){
            echo $i;
        }

        //结束标记
        G('end');
        echo '<hr>';
        //统计结果
        echo G('start','end','m');
    }

    //增加AR模式来操作表(增加操作)
    public function test18(){
        //映射表
        $model=M('Dept');
        //属性映射字段
        $model->name='技术部';
        $model->pid=0;
        $model->sort='50';
        $model->remark='技术大牛存在的地方';
        //实例化映射记录
        $result=$model->add();
        echo $result;
    }

    //增加AR模式来操作表(修改操作)
    public function test19(){
        //映射表
        $model=M('Dept');
        //属性映射字段
        $model->id=6;
        $model->name='技术部';
        $model->pid=0;
        $model->sort='25';
        $model->remark='技术大牛存在的地方';
        //实例化映射记录
        $result=$model->save();
        echo $result;
    }

    //AR模式没有查询模式
    public function AR_chaxun(){
        echo 'AR模式没有查询模式,使用select()和find()方法查询即可';
    }

    //增加AR模式来操作表(删除操作)
    public function test20(){
        //映射表
        $model=M('Dept');
        //属性映射字段
        $model->id=6; //DELETE FROM `sp_dept` WHERE `id` = 6
        //实例化映射记录
        $result=$model->delete();
        echo $result;
    }

    //框架封装的where方法
    public function test21(){
        $model=M('Dept');
        //设置条件
        $model->where('id>=2'); //SELECT * FROM `sp_dept` WHERE ( id>=2 )
        $result=$model->select();
        dump($result);
    }

    //框架封装的limit方法
    public function test22(){
        $model=M('Dept');
        //设置条件
//        $model->limit(1);//只有一个参数
        $model->limit('1,2');//只有一个参数 SELECT * FROM `sp_dept` LIMIT 1,2
        $result=$model->select();
        dump($result);
    }

    //框架封装的field方法 限制字段 相当于select 字段1,字段2 from .......
    public function test23(){
        $model=M('Dept');
        //设置条件
        $model->field('id,name,sort');//SELECT `id`,`name`,`sort` FROM `sp_dept`
        $result=$model->select();
        dump($result);
    }

    //框架封装的order方法
    public function test24(){
        $model=M('Dept');
        //设置条件
        $model->order('id desc');//SELECT * FROM `sp_dept` ORDER BY id desc
        $result=$model->select();
        dump($result);
    }

    //框架封装的group方法 ---->原始SQL语句:select name,count(*) from sp_dept group by name;
    public function test25(){
        $model=M('Dept');
        //设置条件
        $model->field('name,count(*)');//设置字段
        $model->group('name');//设置分组
        $result=$model->select(); //SELECT `name`,count(*) FROM `sp_dept` GROUP BY name
        dump($result);
    }

    //连贯操作
    public function test26(){
        $model=M('Dept');
        //连贯操作
        $result=$model->field('name,count(*) as count')->group('name')->select(); //SELECT `name`,count(*) as count FROM `sp_dept` GROUP BY name
//        $result=$model->field('name,count(*)')->group('name')->select(); //SELECT `name`,count(*) FROM `sp_dept` GROUP BY name
        dump($result);
    }

    //count方法获取总记录数
    public function test27(){
        //实例化模型
        $model=M('Dept');
        //查询记录数
        $result=$model->count();//SELECT COUNT(*) AS tp_count FROM `sp_dept` LIMIT 1
        dump($result);
    }

    //thinkPHP封装的max('字段名')方法,查询最大值
    //一般用于获取表中最新的一条记录
    public function test28(){
        //实例化模型
        $model=M('Dept');
        //查询记录数
        $result=$model->max('id');//SELECT MAX(id) AS tp_max FROM `sp_dept` LIMIT 1
        dump($result);
    }

    //thinkPHP封装的min('字段名')方法,查询最小值
    //一般用于获取表中最早的一条记录
    public function test29(){
        //实例化模型
        $model=M('Dept');
        //查询记录数
        $result=$model->min('id');//SELECT MIN(id) AS tp_min FROM `sp_dept` LIMIT 1
        dump($result);
    }

    //thinkPHP封装的avg('字段名')方法,查询平均值
    public function test30(){
        //实例化模型
        $model=M('Dept');
        //求平均值
        $result=$model->avg('sort');//SELECT AVG(sort) AS tp_avg FROM `sp_dept` LIMIT 1
        dump($result);
    }

    //thinkPHP封装的sum('字段名')方法,求和
    public function test31(){
        //实例化模型
        $model=M('Dept');
        //求平均值
        $result=$model->sum('sort');//SELECT SUM(sort) AS tp_sum FROM `sp_dept` LIMIT 1
        dump($result);
    }

    //thinkPHP里面调试SQL语句的方法fetchSql()
    //一般用于检测连贯操作是否SQL语句错误,放在CURD之前
    public function test32(){
        //实例化模型
        $model=M('Dept');
        //检测
        $result=$model->field('name,count(*) as count')->group('name')->fetchSql(false)->select();
        //fetchSql(false) -->执行sql, fetchSql(false)-->不执行sql
        dump($result);
    }

    //thinkphp中的批量创建数据对象的函数create();
    public function test33(){
        echo "替换I('post.')";
    }

    //session
    public function test34(){
        //设置
        session('name','韩梅梅');
        session('name2','李梅');
        session('name3','谢逊');
        dump($_SESSION);

        //读取
        dump(session('name'));

        //删除
        dump(session('name',null));
        dump($_SESSION);

        //读取全部
        dump(session());

        //判断是否存在
        dump(session('?name2'));

        //删除全部
        session(null);
        dump($_SESSION);
    }

    //cookie
    public function test35(){
        //设置cookie
        cookie('name','夏洛');
        //设置包含有日期的cookie
        cookie('name2','张三',3600);
        //获取单个cookie
        dump(cookie('name'));
        //获取全部cookie
        cookie();
        //清空指定的cookie
        cookie('name',null);
        //清空所有cookie
        cookie(null);//该方法有bug
    }

    //文件载入方式之函数库加载
    public function test36(){
        gbk2utf8();
    }

    //文件加载方式之动态加载
    //配置在应用级别的配置文件：LOAD_EXT_FILE
    public function test37(){
        //__APP__/common/common/info/getInfo()
        getInfo();
    }

    //文件载入方式之通过load()方法加载
    public function test38(){
        //load
        load('@/hello');
        sayHello('tom');
    }

    //常规验证码
    public function test39(){
        //配置
        $cfg = array(
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

    //中文验证码
    public function test40()
    {
        //配置
        $cfg = array(
            'useZh'     =>  true,           // 使用中文验证码
            'fontSize' => 20,              // 验证码字体大小(px)
            'useCurve' => false,            // 是否画混淆曲线
            'useNoise' => false,            // 是否添加杂点
            'imageH' => 0,               // 验证码图片高度
            'imageW' => 0,               // 验证码图片宽度
            'length' => 4,               // 验证码位数
            'fontttf' => '',              // 验证码字体，不设置随机获取
        );
        //实例化验证码类
        $verify = new \Think\Verify($cfg);
        //输出验证码
        $verify->entry();
    }

<<<<<<< HEAD
    //获取id
    public function test45(){
        //获取ip
        echo get_client_ip(),'</br>';//默认获取IP形式：127.0.0.1
        echo get_client_ip(1),'</br>';//默认获取数字形式：2130706433
    }

    //IP地址对应的物理地址
    public function test46(){
        //实例化相关类
        $Ip=new \Org\Net\IpLocation('qqwry.dat');
        $ss=I('get.ip');
        //查询
        $data=$Ip->getlocation($ss);
        dump($data);
=======
    //连表查询 方法1 执行原生sql语句
    public function test41(){
        //实例化模型
        $model=M();//执行原声sql的时候不用指定表
        $sql="select user.*,dept.name as deptname from sp_user as user,sp_dept as dept where user.dept_id=dept.id";
        $result=$model->query($sql);
        dump($result);
    }

    //连表查询 方法2 使用thinkphp中的table('表明1 [as 别名1],表名2[as 别名2]....');
    public function test42(){
        //实例化模型
        $model=M();//执行原声sql的时候不用指定表
        $result=$model->field('user.*,dept.name as deptname')
            ->table('sp_user as user,sp_dept as dept')
            ->where('user.dept_id=dept.id')
            ->select();
        dump($result);
    }

    //连表查询方法3,使用原生的join
    public function test43(){
        //实例化模型
        $model=M();//执行原声sql的时候不用指定表
        $sql="select user.*,dept.name as deptname from sp_user as user left join sp_dept as dept on user.dept_id=dept.id";
        $result=$model->query($sql);
        dump($result);
    }

    //连表查询方法4,使用thinkphp中的join('[inner/left/right/full] join] 表名2[as 别名2 on 别名表1.字段1=别名表2.字段2')
    //主要用于自连查询 select user.*,dept.name as deptname from sp_user as user left join sp_dept as dept on user.pid=dept.id
    public function test44(){
        //实例化模型
        $model=M('Dept');//执行原声sql的时候不用指定表
//        dump($model);die();
        $result=$model->field('user.*,dept.name as deptname')
            ->alias('user')
            ->join('left join sp_dept as dept on user.pid=dept.id')
            ->select();
        dump($result);
>>>>>>> 435d24758809cf0847efa6793b190d76b2097c71
    }
}
