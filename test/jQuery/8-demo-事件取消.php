<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
        div{
            width:300px;
            height:200px;
            background-color: gray;
        }
    </style>
    <script type="text/javascript" src="jquery-1.4.4/jquery.js"></script>
    <script type="text/javascript">
        //事件绑定处理函数是有名函数
        function f1() {alert('事件绑定处理函数是有名函数,不需要带括号')};//有名函数

        //给页面绑定事件
        $(function () {
            $('div').bind({
                mouseover:function () {$(this).css('background-color','blue')},//匿名函数
                mouseout:function () {$(this).css('background-color','red')},
                click:function () {$(this).css('background-color','green')}
            });

            //绑定有名函数.同一个事件多个
            $('div').bind('mouseover',f1);//注意不带参数
        });

        //取消事件
        function cancel() {
//            $('div').unbind();//取消全部事件
//            $('div').unbind('mouseover');//取消全部mouseover事件
            $('div').unbind('mouseover',f1);//取消具体的加载事件,函数必须是有名函数

        }

    </script>
</head>
<body>
<h2 class="orange"> jQuery取消事件绑定</h2><br/>
<div>this is a button</div>
<input type="button" value="取消事件" onclick="cancel()"/>
</body>
</html>