<!--jQuery属性方法操作-->
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
//            //原始操作
//            $('div').attr('class','apple');
//            $('div').attr('class','pear');
//            $('div').attr('class','banner');
//            //快捷操作
//            $('div').addClass('apple');//追加属性 class="apple "
//            $('div').addClass('pear');//追加属性 class="apple pear"
//            $('div').addClass('banner');//追加属性 class="apple pear banner"
//            //删除class属性的值
//            $('div').removeClass('apple');//删除值
            //开关
            $('div').toggleClass('apple');
        }
    </script>
    <style type="text/css">
        .apple{width:300px;color:red}
        .pear{width:300px;color:green}
        .banner{width:300px;color:gray}
    </style>

</head>
<body>
<h2 class="orange"> jQuery属性快捷操作</h2><br/>
<div>属性快捷操作</div>
<input type="text" name="username" id="username" value="tom" address="北京"><br/>
<input type="button" value="点击" onclick="f1()"/>
</body>
</html>