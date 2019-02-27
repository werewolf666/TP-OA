<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test13</title>
</head>
<body>
volist标签：<br>
<?php if(is_array($array)): $i = 0; $__LIST__ = $array;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vol): $mod = ($i % 2 );++$i; echo ($vol); ?>--<?php endforeach; endif; else: echo "" ;endif; ?>
<hr/>
foreach标签：<br>
<?php if(is_array($array)): foreach($array as $key=>$for): echo ($for); ?>--<?php endforeach; endif; ?>
<hr/>
volist标签显示二维数组:<br/>
<?php if(is_array($array2)): $i = 0; $__LIST__ = $array2;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vol): $mod = ($i % 2 );++$i; if(is_array($vol)): $i = 0; $__LIST__ = $vol;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$vo): $mod = ($i % 2 );++$i; echo ($vo); ?>--<?php endforeach; endif; else: echo "" ;endif; ?>
    <br><?php endforeach; endif; else: echo "" ;endif; ?>
<hr/>
foreach标签显示二维数组:<br/>
<?php if(is_array($array2)): foreach($array2 as $key=>$for): echo ($for[0]); ?>--<?php echo ($for[1]); ?>--<?php echo ($for[2]); ?>--<?php echo ($for[3]); ?> <br/><?php endforeach; endif; ?>
</body>
</html>