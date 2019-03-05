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
            console.log($('div').css('width'));//获取样式
            $('div').css('color','green');//设置样式
        }
    </script>
    <style type="text/css">
        div{
            width:300px;
            color:red;
            height: 200px;
            background-color:gray
        }
    </style>
</head>
<body>
<h2 class="orange"> jQuery标签内容操作</h2><br/>
<div>CSS样式操作</div><br/>
<input type="button" value="点击" onclick="f1()"/>
</body>
</html>