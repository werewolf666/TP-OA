<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
变量：<?php echo ((isset($info) && ($info !== ""))?($info):'变量不存在或者为空'); ?>
</body>
</html>