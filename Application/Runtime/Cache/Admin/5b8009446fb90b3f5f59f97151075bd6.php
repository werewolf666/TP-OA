<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="">
    中括号形式输出：<?php echo ($array[0]); ?> - <?php echo ($array[1]); ?> - <?php echo ($array[2]); ?> - <?php echo ($array[3]); ?><br>
    点形式输出：<?php echo ($array["0"]); ?>-<?php echo ($array["1"]); ?>-<?php echo ($array["2"]); ?>-<?php echo ($array["3"]); ?><br>
    <hr>
    二位数组在thinkphp中的显示：<br>
    中括号形式输出：<?php echo ($array2[0][0]); ?> - <?php echo ($array2[0][1]); ?> - <?php echo ($array2[0][2]); ?> - <?php echo ($array2[0][3]); ?><br>
    点形式输出：<?php echo ($array2["0"]["0"]); ?>-<?php echo ($array2["0"]["1"]); ?>-<?php echo ($array2["0"]["2"]); ?>-<?php echo ($array2["0"]["3"]); ?><br>
</div>
</body>
</html>