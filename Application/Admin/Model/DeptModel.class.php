<?php
namespace Admin\Model;
use Think\Model;
class DeptModel extends Model{
    // 是否批处理验证
    protected $patchValidate    =   false;
    protected $_map             =   array(
        // 字段映射定义
        //键是表单中的name值，值是数据表中的字段名
        'abc'       =>      'name',
        'wasd'      =>      'sort'
    );
    //自动验证规则
    protected $_validate    =   array(
        //部门名称的规则1：必填，不萌不能重复
        array('name','require','部门名称不能为空'),
        array('name','','部门名称已经存在',0,'unique'),
        //排序字段的验证
//        array('sort','number','排序必须为数字'),
        //使用函数来验证排序是否是数字
        array('sort','is_numeric','排序必须是数字',0,'function'),
    );

}