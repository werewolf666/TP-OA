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
        window.onload=function () {
            //默认选中1,2,3
            $('.bby').val([1,2,3]);
        }

        function f1() {
            //默认选中1,2,3
            $('.bby').val([2,3,4]);
        }

        function f2() {
            //下拉列表获取值
            console.log($('option:selected').val());
        }

        function f3() {
            //全选操作
            $('.bby').attr('checked',true);//全选
        }
    </script>
    <style type="text/css"></style>
</head>
<body>
<h2 class="orange"> jQuery复选框操作</h2><br/>
<div>
    爱好
    <input type="checkbox" class="bby" name="bobby[]" id="" value="1" />篮球
    <input type="checkbox" class="bby" name="bobby[]" id="" value="2" />排球
    <input type="checkbox" class="bby" name="bobby[]" id="" value="3" />网球
    <input type="checkbox" class="bby" name="bobby[]" id="" value="4" />乒乓
    <br/>
    城市列表:
    <select>
        <option value="0">请选择</option>
        <option value="1">北京</option>
        <option value="2">上海</option>
        <option value="3">深圳</option>
        <option value="4">太原</option>
        <option value="5">沈阳</option>
    </select>
</div>
<br/>
<input type="button" value="复选框操作" onclick="f1()"/>
<input type="button" value="列表框操作" onclick="f2()"/>
<input type="button" value="全选" onclick="f3()"/>
<input type="button" value="反选选" onclick="f4()"/>
<input type="button" value="全不选" onclick="f5()"/>
</body>
</html>