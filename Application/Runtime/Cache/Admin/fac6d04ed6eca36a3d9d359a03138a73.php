<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test14</title>
</head>
<body>
<!--<?php if(条件表达式): ?>-->
    <!--输出结果1-->
    <!--<?php elseif(条件表达式2): ?>-->
    <!--输出结果2-->
    <!--<?php elseif(条件表达式3): ?>-->
    <!--输出结果3-->
    <!--....-->
    <!--<?php else: ?>-->
<!--<?php endif; ?>-->
<?php if($date==1): ?>星期一
    <?php elseif($date==2): ?>
    星期二
    <?php elseif($date==3): ?>
    星期三
    <?php elseif($date==4): ?>
    星期四
    <?php elseif($date==5): ?>
    星期五
    <?php elseif($date==6): ?>
    星期六
    <?php elseif($date==7): ?>
    星期天
    </elseif><?php endif; ?>
</body>
</html>