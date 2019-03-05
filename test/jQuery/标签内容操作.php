<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script type="text/javascript" src="jquery-1.4.4/jquery.js"></script>
    <script type="text/javascript">
        function f1() {
//            console.log($('div').html());//获取内容
//            $('div').html('潘金莲-<a href="https://www.baidu.com">百度</a>');//设置内容
//            $('div').text();//获取内容,过滤标签
//            $('div').text('潘金莲-<a href="https://www.baidu.com">百度</a>');//潘金莲-<a href="https://www.baidu.com">百度</a>
        }
    </script>
    <style type="text/css">
        .apple{width:300px;color:red}
        .pear{width:300px;color:green}
        .banner{width:300px;color:gray}
    </style>

</head>
<body>
<h2 class="orange"> jQuery标签内容操作</h2><br/>
<div>没有值<span>-江南烟雨</span></div><br/>
<input type="button" value="点击" onclick="f1()"/>
</body>
</html>