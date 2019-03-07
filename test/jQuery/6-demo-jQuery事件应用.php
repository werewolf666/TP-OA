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
        //设置事件
        $(function () {
            //设置事件,submit带参数表述设置事件
            $('form').submit(function () {
                //具体事件内容
                alert($('#username').val());
            });
        });

        function f1() {
            $('form').submit();//不带参数表示提交
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery事件的应用</h2><br/>
<form method="post" action="">
    用户名：<input type="text" id="username" /><br/>
    <input type="button" id="btn"  value='提交' onclick="f1()">
</form>
</body>
</html>