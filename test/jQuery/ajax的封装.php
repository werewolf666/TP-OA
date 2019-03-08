<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
        div{
            background-color: red;
        }
    </style>
    <script type="text/javascript" src="jquery-1.4.4/jquery.js"></script>
    <script type="text/javascript">
        function load() {
            //load请求,获取不带参数
            $('div').load('./2019-03-04.txt');
        }

        function get() {
//            $.get('./get.php',{name:'tom',sex:'man'},function (data,status) {
//                alert('Data:'+data+'status:'+status);
//            });
                $.get('./get.php',{name:'tom',sex:'man'},function (msg) {
                    console.log(msg);
                    console.log(msg.name);
                    },'json');//返回格式为json
        }
        //post请求参数方法一致
        //ajax();可定义参数比较多
        function ajax() {
            //ajax()
            $.ajax({
                url:'./ajax.php',
                data:'hello ajax',
                type:'post',
                dataType:'json',
                success:function (msg) {console.log(msg)}
                }
            );
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery对ajax的封装(get/post)</h2><br/>
<div></div>
<input type="button" value="load" onclick="load()"/>
<input type="button" value="get" onclick="get()"/>
<input type="button" value="post" onclick="post()"/>
<input type="button" value="ajax" onclick="ajax()"/>
</body>
</html>