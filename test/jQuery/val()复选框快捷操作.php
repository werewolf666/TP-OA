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
//            console.log($('.bby:checked').val())
//            console.log($('.bby:checked'))//选中所有的
            var s='';
            for (var i=0;i<$('.bby:checked').length;i++){
                //获取每个复选框的值
                s += $('.bby:checked:eq('+i+')').val()+',';//attr('value')
            }
            //去掉最后逗号
            s=s.substr(0,s.length-1);
            console.log(s);
        }
    </script>
    <style type="text/css"></style>
</head>
<body>
<h2 class="orange"> jQuery标val复选框操作</h2><br/>
<div>爱好
    <input type="checkbox" class="bby" name="bobby[]" id="" value="1" />篮球
    <input type="checkbox" class="bby" name="bobby[]" id="" value="2" />排球
    <input type="checkbox" class="bby" name="bobby[]" id="" value="3" />网球
    <input type="checkbox" class="bby" name="bobby[]" id="" value="4" />乒乓<br/>
</div><br/>
<input type="button" value="点击" onclick="f1()"/>
</body>
</html>