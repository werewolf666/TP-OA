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
        //给页面绑定事件
        $(function () {
//            //$('节点').band('事件名称',事件处理程序)
//            $('div').bind('mouseover',function () {
//                //this代表div的dom对象
//                $(this).css('color','red');
//            });
//
//            //单事件
//            $('div').bind('click',function () {
//                alert('click事件');
//            });

            //绑定多事件 $().bind(json对象)
            $('div').bind({
                mouseover:function () {$(this).css('background-color','blue')},
                mouseout:function () {$(this).css('background-color','red')},
                click:function () {$(this).css('background-color','green')}
            });
        });
        
        function f1() {

        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery事件绑定</h2><br/>
<div>this is a button</div>
<input type="button" value="触发" onclick="f1()"/>
</body>
</html>