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
        //传统的加载只能加载最后一个onload，jQuery可以同时加载很多的事件函数
        //传统加载事件的是在整个页面加载显示完成后才执行，jQuery加载事件是在整个文档的结构完成则实行
        window.onload=function () {
            console.log('1');
        }

        $().ready(function () {
            console.log('jquery');
        });
    </script>
</head>
<body>
<h2 class="orange"> jQuery加载事件与传统的加载事件区别</h2><br/>

</body>
</html>