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
        function f1(){
            //jquery对象在调用自身方法
            //$('h2').css('color','gray');

            //dom对象调用jQuery方法[失败]
            //document.getElementsByTagName('h2')[0].css('color','red');//失败
            //document.getElementsByTagName('h2')[0].style.color='red';//dom 调用自身方法

            //jquery 调用dom方法【失败】
            // $('h2').style.color='gray';//失败

            //dom对象是jQuery对象的一个数组组成部分
            //$('h2')[0].style.color='gray';//成功

            //dom对象转换为jQuery对象
            //var dom=document.getElementsByTagName('h2');//dom对象
            //$(dom).css('color','red');
        }

    </script>
</head>
<body>
<h2 class="orange"> jQuery对象和DOM对象</h2><br/>
<input type="button" value="触发" onclick="f1()" />
</body>
</table>
</html>