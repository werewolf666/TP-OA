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
        //jQuery加载时间相当window.onload=function(){}
        //方法1
        $(document).ready(function () {
            $('h2').css('color','red');
        });
        //方法2
        $().ready(function () {
            $('h2').css('background-color','gray');
        });
        //方法3 推荐,对方法1的封装
        $(function () {
            $('h2').css('width','500px');
        });
    </script>
</head>
<body>
<h2 class="orange"> jQuery加载事件</h2><br/>

</body>
</html>