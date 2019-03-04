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
            console.log($('input:lt(4):checked'));//获取多选按钮值
            console.log($('input:gt(3):checked'));//获取单选按钮值
        }
    </script>

</head>
<body>
<h2 class="orange"> jQuery表单域中的选择器(爱好复选框)</h2><br/>
爱好
<input type="checkbox" class="bby" name="bobby[]" id="" value="1" />篮球
<input type="checkbox" class="bby" name="bobby[]" id="" value="2" />排球
<input type="checkbox" class="bby" name="bobby[]" id="" value="3" />网球
<input type="checkbox" class="bby" name="bobby[]" id="" value="4" />乒乓<br/>
性别:
<input type="radio" class="sex" name="sex" value="man" />男
<input type="radio" class="sex" name="sex" value="women" />女
<input type="radio" class="sex" name="sex" value="pri" />保密<br/>
城市列表
<input type="button" value="点击" onclick="f1()"/>
</body>
</html>