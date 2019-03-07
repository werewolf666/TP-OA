<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css">
        select{
            width:130px;
            height:220px;
        }
    </style>
    <script type="text/javascript" src="jquery-1.4.4/jquery.js"></script>
    <script type="text/javascript">

        function toRight() {
            //左->右
            console.log($('#hebei option:selected').appendTo($('#henan')));
        }

        function toleft() {
            //往左
            $('#henan option:selected').appendTo($('#hebei'));
        }

        function toAllRight() {
            //全部往右
            $('#hebei option').appendTo($('#henan'));
        }

        function toAllleft() {
            //全部往右
            $('#henan option').appendTo($('#hebei'));
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery下拉列表的复制作用</h2><br/>
<select id="hebei" multiple="multiple">
    <option>石家庄</option>
    <option>保定</option>
    <option>邯郸</option>
    <option>邢台</option>
    <option>衡水</option>
</select>
<select id="henan" multiple="multiple">
    <option>郑州</option>
    <option>开封</option>
    <option>洛阳</option>
    <option>周口</option>
    <option>信仰</option>
</select>
<br/>
<input type="button" value="--->" onclick="toRight()"/>
<input type="button" value="===>" onclick="toAllRight()">
<input type="button" value="<---" onclick="toleft()">
<input type="button" value="<===" onclick="toAllleft()">
</body>
</html>