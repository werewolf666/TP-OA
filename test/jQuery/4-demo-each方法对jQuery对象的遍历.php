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
            //遍历数组$.each(数组,function(k数组键,v数组值){});
            var color=['gold','red','gray','green'];
            $.each(color,function (k,v) {
                console.log(k+'---'+v);
            });
        }

        function f2() {
            //遍历对象
            //$.each(对象，function(k成员名称,v成员值){})
            var dom ={name:'tom',age:'10',climb:function () {
                    console.log('tom在爬树');
            }};
            $.each(dom,function (k,v) {
                console.log(k+'___'+v);
            })
        }

        function f3() {
            //遍历jQuery对象
            //$().each(function(k-dom对象下标,v-每一个dom对象){})
            $('input').each(function (k,v) {
                //console.log(k);//0，1，2，3，4，5，6
                //console.log(v);//每一个don对象
                //v.style.color='red';//dom对象调用dom方法
                $(v).css('color','green');//dom对象转换为jQuery对象调用jQuery方法

            })
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
<input type="button" value="遍历数组" onclick="f1()"/>
<input type="button" value="遍历对象" onclick="f2()"/>
<input type="button" value="遍历jQuery对象" onclick="f3()"/>
</body>
</html>