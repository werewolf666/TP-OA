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
        function f1() {
            //隐藏div hide([速度，[回调函数]])
            //$('div').hide();//一下子隐藏
            //$('div').hide(6000);//宽高度透明度逐渐变化
            $('div').hide(3000,function () {
                alert('主人~记得想我哦');
            });//回调函数
        }

        function f2() {
            //显示 show([速度，[回调函数]])
            //$('div').show(6000);//显示，宽高度透明度逐渐变化
            $('div').show(3000,function () {
                alert('主人，我回来了');
            });//回调函数
        }
        
        function f3() {
            //开关效果，反复使用
            $('div').toggle(3000,function () {
                alert('我是开关效果');
            });
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery基本动画</h2><br/>
<div>this is a button</div>
<input type="button" value="基本动画(隐藏)" onclick="f1()"/>
<input type="button" value="基本动画（显示）" onclick="f2()"/>
<input type="button" value="基本动画（开关）" onclick="f3()"/>
</body>
</html>