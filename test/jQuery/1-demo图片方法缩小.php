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
            //放大
            var w=$('#image').width();
            var h=$('#image').height();
            //设置新尺寸
            var new_w=w+5;
            var new_h=new_w*h/w;
            //设置
            $('#image').width(new_w);
            $('#image').height(new_h);
        }

        function f2() {
            //缩小
            var w=$('#image').width();
            var h=$('#image').height();
            //设置新尺寸
            var new_w=w-5;
            var new_h=new_w*h/w;
            //设置
            $('#image').width(new_w);
            $('#image').height(new_h);
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery放大缩小</h2><br/>
<img src="./11.jpeg" id="image" alt="" width="400" /><br/>
<input type="button" value="放大" onclick="f1()">
<input type="button" value="缩小" onclick="f2()"><br>
</html>