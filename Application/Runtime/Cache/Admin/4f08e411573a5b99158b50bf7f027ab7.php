<?php if (!defined('THINK_PATH')) exit();?><!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="/Public/Admin/css/base.css" />
<link rel="stylesheet" href="/Public/Admin/css/info-mgt.css" />
<link rel="stylesheet" href="/Public/Admin/css/WdatePicker.css" />
<title>移动办公自动化系统</title>
</head>

<body>
<div class="title"><h2>信息管理</h2></div>
<div class="table-operate ue-clear">
	<a href="javascript:;" class="add">添加</a>
    <a href="javascript:;" class="del">删除</a>
    <a href="javascript:;" class="edit">编辑</a>
    <a href="javascript:;" class="count">统计</a>
    <a href="javascript:;" class="check">审核</a>
</div>
<div class="table-box">
	<table>
    	<thead>
        	<tr>
            	<th class="num">序号</th>
                <th class="name">部门</th>
                <th class="process">所属部门</th>
                <th class="node">排序</th>
                <th class="time">备注</th>
                <th class="operate">操作</th>
            </tr>
        </thead>
        <tbody>
            <?php if(is_array($data)): $i = 0; $__LIST__ = $data;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vol): $mod = ($i % 2 );++$i;?><tr>
                    <td class="id">
                        <input type="checkbox" class="deptid" value="<?php echo ($vol["id"]); ?>"/>
                        &nbsp<?php echo ($vol[id]); ?></td>
                    <td class="name"><?php echo ($vol[name]); ?></td>
                    <td class="pid"><?php if($vol[pid]==0): ?>顶级部门<?php else: echo ($vol[deptName]); endif; ?></td>
                    <td class="sort"><?php echo ($vol[sort]); ?></td>
                    <td class="remark"><?php echo ($vol[remark]); ?></td>
                    <td class="operate"><a href="/index.php/Admin/Dept/edit/id/<?php echo ($vol[id]); ?>">编辑 | </a><a href="/index.php/Admin/Dept/del/id/<?php echo ($vol[id]); ?>">删除</a></td>
            </tr><?php endforeach; endif; else: echo "" ;endif; ?>
        </tbody>
    </table>
</div>
<div class="pagination ue-clear"></div>
</body>
<script type="text/javascript" src="/Public/Admin/js/jquery.js"></script>
<script type="text/javascript" src="/Public/Admin/js/common.js"></script>
<script type="text/javascript" src="/Public/Admin/js/WdatePicker.js"></script>
<script type="text/javascript" src="/Public/Admin/js/jquery.pagination.js"></script>
<script type="text/javascript">
$(".select-title").on("click",function(){
	$(".select-list").hide();
	$(this).siblings($(".select-list")).show();
	return false;
})
$(".select-list").on("click","li",function(){
	var txt = $(this).text();
	$(this).parent($(".select-list")).siblings($(".select-title")).find("span").text(txt);
})

$('.pagination').pagination(100,{
	callback: function(page){
		alert(page);	
	},
	display_msg: true,
	setPageNo: true
});

$("tbody").find("tr:odd").css("backgroundColor","#eff6fa");

showRemind('input[type=text], textarea','placeholder');
//jQuery代码
    $(function () {
        //给删除按钮绑定点击时间
        $('.del').on('click',function () {
            //事件处理
            var idObj=$(':checkbox:checked');//获取全部的选择的数据
            console.log(idObj);
            //循环遍历idObj对象，获取每个id的值
            var id='';//组成数组形式
            for (var i=0;i<idObj.length;i++) {
                id+=idObj[i].value+',';
            }
            console.log(id);//1,6,2,7,
            //去掉最后的逗号
            id=id.substring(0,id.length-1);
            //带着参数id跳转到相应的页面
            window.location.href='/index.php/Admin/Dept/del/id/'+id;
        });
    });
</script>
</html>