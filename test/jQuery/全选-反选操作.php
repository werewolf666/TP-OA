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
            //全选操作
            $('.bby').attr('checked',true);
        }

        function f2() {
            //反选,没选中选,选中不选
            //遍历全部复选框,选中就取消...
            for (var i = 0;i<$('.bby').length;i++){
                var flag = $('.bby:eq('+i+')').attr('checked');
                $('.bby:eq('+i+')').attr('checked',!flag);//关键操作--优雅
            };
        }

        function f3() {
            //全不选
            $('.bby').attr('checked',false);//全不选
        }
    </script>
</head>
<body>
<h2 class="orange"> jQuery复选框操作</h2><br/>
爱好
<input type="checkbox" class="bby" name="bobby[]" id="" value="1" />篮球
<input type="checkbox" class="bby" name="bobby[]" id="" value="2" />排球
<input type="checkbox" class="bby" name="bobby[]" id="" value="3" />网球
<input type="checkbox" class="bby" name="bobby[]" id="" value="4" />乒乓
<br/>
<br/>
<input type="button" value="全选" onclick="f1()"/>
<input type="button" value="反选" onclick="f2()"/>
<input type="button" value="全不选" onclick="f3()"/>
</body>
</html>