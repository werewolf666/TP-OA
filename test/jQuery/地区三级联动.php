<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style type="text/css"></style>
    <script type="text/javascript" src="jquery-1.4.4/jquery.js"></script>
    <script type="text/javascript">
        //定义xml变量
        var xmldom=null;
        //获取全部省份信息
        function showPrince() {
            //(1):ajax去服务器端获取信息xml文件
            $.ajax({
                url:'./ChinaArea.xml',
//                data:'',
                dataType:'xml',
                type:'get',
                success:function (msg) {
//                    console.log(msg);
                    xmldom=msg;//获得xml对象
                    var province = $(msg).find('province');//在msg对象中找到省份节点对象
//                    console.log(province);
                    //遍历省份信息
                    province.each(function (k,v) {
                        //console.log(k+'___'+v);
                        var nm= $(v).attr('province');
                        var provinceID=$(v).attr('provinceID');
                        //console.log(nm);
                        $('#province').append("<option value='"+provinceID+"'>"+nm+"</option>");
                    });
                }
            });
        }

        function showCity() {
            //根据选中的省份显示城市
            var pid=$('#province option:selected').val();//获取省份id
            //console.log(pid);
            var xml_province = $(xmldom).find('province[provinceID='+pid+']');//在xml中通过属性值找到province标签
            var citys = $(xml_province).find('City');//找到全部city
            citys.each(function (k,v) {
                var nm =$(v).attr('City');
                var cityID=$(v).attr('CityID');
                //console.log(nm);
                $('#city').append("<option value='"+cityID+"'>"+nm+"</option>");//添加city
            });
        }

        function showPiecearea() {
            //根据选中的省份显示城市
            var pid=$('#city option:selected').val();//获取cityid
            //console.log(pid);
            var xml_city = $(xmldom).find('City[CityID='+pid+']');//在xml中通过属性值找到Piecearea标签
            var pieceareas = $(xml_city).find('Piecearea');//找到全部diqu
            pieceareas.each(function (k,v) {
                var nm =$(v).attr('Piecearea');
                var PieceareaID=$(v).attr('PieceareaID');
                //console.log(nm);
                $('#piecearea').append("<option value='"+PieceareaID+"'>"+nm+"</option>");//添加Piecearea
            });
        }


        //设置加载事件
        $(function () {
            showPrince();
        })

    </script>
</head>
<body>
<h2 class="orange"> jQuery地区三级联动</h2><br/>
省份:<select id="province" onchange="showCity()"><option value="0">---请选择---</option></select>
城市:<select id="city" onchange="showPiecearea()"><option value="0">---请选择---</option></select>
地区:<select id="piecearea"><option value="0">---请选择---</option></select>
</body>
</html>