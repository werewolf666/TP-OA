<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>jQuery使用</title>
    <script type="text/javascript" src="jquery-1.4.4/jquery.js"></script>
    <script type="text/javascript">
        function f1() {
            //通过选择器
            $('#username').css('background-color','red');//方法1
            $('h1').css('color','gray');//通过标签名称获取元素节点
            $('input').css('color','green');//通过标签名称获取元素节点-所欲几点
            $('.apple').css('color','gray');//通过.class获取元素节点

            $('h1 input').css('color','gray');//平行选择器
            $('div>span').css('color','gray');//子元素选择器
            $('div~span').css('color','gray');//选择器

            $('li:first').css('color','gray');//并行选择器first
            $('li:last').css('color','green');//并行选择器last
            $('li:eq(4)').css('color','green');//equal(),寻找节点下表
            $('li:gt(4)').css('color','red');//节点下标大于4
            $('li:lt(4)').css('color','red');//节点下标小于4


        }
    </script>
</head>
<body>
<h1>jQuery基本选择器</h1>
<div>
    <span>关羽</span>
</div>
<span>刘备</span>
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>

    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
</ul>
<input type="text" id="username" value="小明"><br/>
<input type="text" id="useremail" value="小明@qq.com"><br/>
<input type="text" id="addr" class="apple" value="北京"><br/>
<input type="button"  value="点击" onclick="f1()"><br/>
</body>
</html>