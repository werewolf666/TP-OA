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
            //获取属性信息
//            console.log($('input:first').attr('value'));
//            console.log($('input:first').attr('address'));
//            //修改属性,单次修改
//            console.log($('input:first').attr('class','banner'));
//            //属性删除 ....
//            console.log($('input:first').removeAttr('class'));
//            console.log($('input:first').removeAttr('address'));
//            //批量修改属性,$().attr(json对象)
//            var jn={'class':'prae','id':'useremail','name':'username','value':'jim@.com','address':'beijin'}
//            console.log($('input:first').attr(jn));
            //通过函数返回值修改
            console.log($('input:first').attr('value',function () {
                //代码块
                return 666;
            }));
        }
    </script>

</head>
<body>
<h2 class="orange"> jQuery属性操作</h2><br/>
<br/>
<input type="text" name="username" id="username" class="apple" value="tom" address="北京">
<input type="button" value="点击" onclick="f1()"/>
</body>
</html>