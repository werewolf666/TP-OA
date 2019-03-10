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
            //slideUp([速度]，[回调函数])
            $('div').slideUp(3000,function () {
                alert('垂直隐藏');
            });
        }

        function f2() {
            //slideDown([速度],[回调函数])
            $('div').slideDown(3000,function () {
                alert('垂直显示');
            });
        }

        function f3() {
            //开关效果，反复使用
            $('div').slideToggle(3000,function () {
                alert('我是开关效果');
            });
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery基本动画</h2><br/>
<div>this is a button</div>
<input type="button" value="垂直动画(隐藏)" onclick="f1()"/>
<input type="button" value="垂直动画（显示）" onclick="f2()"/>
<input type="button" value="垂直动画（开关）" onclick="f3()"/>
</body>
</html>