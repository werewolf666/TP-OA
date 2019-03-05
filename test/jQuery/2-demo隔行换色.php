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
        window.onload=function(){
            //首页换色
            $('tr:first').css('background','gray');
            //隔行换色
            $('tr:gt(0):odd').css('background','lightblue');//even 选择偶数 odd 选择奇数
        }
        function kongzhi() {
            //控制复选框
            var flag=$('.ctl').attr('checked');//获取首航控制复选框
            $('.gd').attr('checked',flag);
        }
    </script>
    <style type="text/css">
        table{
            width: 700px;
            margin: auto;
            border:1px solid black;
            border-collapse:collapse;
        }
        td{
            border:1px solid black ;
        }
        h2{
            width: 700px;
            margin:auto;
            text-align:center;
        }
    </style>
</head>
<body>
<h2 class="orange"> jQuery隔行换色</h2><br/>
<table>
    <tr>
        <td><input type="checkbox" class="ctl" onclick="kongzhi()" /></td>
        <td>序号</td><td>名称</td><td>价格</td><td>数量</td>
    </tr>
    <tr>
        <td><input type="checkbox" class="gd"/></td>
        <td>1</td><td>iphone</td><td>5000</td><td>20</td>
    </tr>
    <tr>
        <td><input type="checkbox" class="gd"/></td>
        <td>2</td><td>sumsung</td><td>4000</td><td>30</td>
    </tr>
    <tr>
        <td><input type="checkbox" class="gd"/></td>
        <td>3</td><td>huawei</td><td>3000</td><td>40</td>
    </tr>
    <tr>
        <td><input type="checkbox" class="gd"/></td>
        <td>4</td><td>nokia</td><td>2000</td><td>50</td>
    </tr>
    <tr>
        <td><input type="checkbox" class="gd"/></td>
        <td>5</td><td>htc</td><td>1000</td><td>60</td>
    </tr>
</table>
</html>