<?php
//创造树
function createTree($list,$pid=0,$level=0)
{
    static $tree = array();
    foreach ($list as $rows)
    {
        if ($rows['pid'] == $pid)
        {
            $rows['level'] = $level;
            $tree[] = $rows;
            createTree($list, $rows['id'], $level + 1);
        }
        return $tree;
    }
}