redis 127.0.0.1:6379> set name asion //单个设置字符串
OK
redis 127.0.0.1:6379> get name
"asion"

redis 127.0.0.1:6379>  set age 111
OK
redis 127.0.0.1:6379> incr age //为某个字段自增
(integer) 112
redis 127.0.0.1:6379> decr age //为某个字段自减
(integer) 111

redis 127.0.0.1:6379> INCRBY age 20 //为某个字段增加指定数字
(integer) 131
redis 127.0.0.1:6379> DECRBY age 20 //为某个字段减少指定数字
(integer) 111

redis 127.0.0.1:6379> KEYS * //获取所有key
1) "age"
2) "name"

redis 127.0.0.1:6379> keys age //获取某个key
1) "age"

redis 127.0.0.1:6379> set it_user:id:1:username tom //单个设置关联数组类型的信息，mysql表结构转换为redis
OK
redis 127.0.0.1:6379> set it_user:id:1:email tom@sina.com
OK
redis 127.0.0.1:6379> set it_user:id:2:username alex
OK
redis 127.0.0.1:6379> set it_user:id:2:email alex@163.com
OK

redis 127.0.0.1:6379> keys it_user* //获取所有关联字段的key
1) "it_user:id:1:email"
2) "it_user:id:1:username"
3) "it_user:id:2:username"
4) "it_user:id:2:email"

redis 127.0.0.1:6379> keys it_user:id:1:username //获取某个关联字段key
1) "it_user:id:1:username"
redis 127.0.0.1:6379> get it_user:id:1:username
"tom"

redis 127.0.0.1:6379> HSET use rInfo name tom //单个hash数据存储
(integer) 1
redis 127.0.0.1:6379> HGET userInfo name
"tom"

redis 127.0.0.1:6379> HMSET userInfo age 18 email tom@163.com sex male //多个hash数据存储
OK

redis 127.0.0.1:6379> HGETALL userInfo //获取所有hash数据的key和value
1) "name"
2) "tom"
3) "age"
4) "18"
5) "email"
6) "tom@163.com"
7) "sex"
8) "male"
redis 127.0.0.1:6379>

//link类型
redis 127.0.0.1:6379> lpush link1 a //从左侧加入数据
(integer) 1
redis 127.0.0.1:6379> lpush link2 b
(integer) 1
redis 127.0.0.1:6379> lpush link3 c
(integer) 1
redis 127.0.0.1:6379> lpush link1 a
(integer) 2
redis 127.0.0.1:6379> lpush link1 b
(integer) 3
redis 127.0.0.1:6379> lpush link1 c
(integer) 4

redis 127.0.0.1:6379> rpush link2 c //从右侧加入数据
(integer) 2
redis 127.0.0.1:6379> rpush link2 b
(integer) 3
redis 127.0.0.1:6379> rpush link2 a
(integer) 4

redis 127.0.0.1:6379> LRANGE link1 0 -1 //查看指定分支link1 的所有数据
1) "c"
2) "b"
3) "a"
4) "a"

redis 127.0.0.1:6379> LPOP link1 //弹出左侧第一个数据
"c"
redis 127.0.0.1:6379> lrange link1 0 -1
1) "b"
2) "a"
3) "a"

redis 127.0.0.1:6379> RPOP link1 //弹出右侧最后一个数据
"a"
redis 127.0.0.1:6379>
redis 127.0.0.1:6379> lrange link1 0 -1
1) "b"
2) "a"


//集合
redis 127.0.0.1:6379> SADD set1 1 添加集合
(integer) 1
redis 127.0.0.1:6379> sadd set1 2
(integer) 1
redis 127.0.0.1:6379> smembers set1 //获取集合数据
1) "1"
2) "2"
redis 127.0.0.1:6379> sadd set1 3
(integer) 1
redis 127.0.0.1:6379> smembers set1
1) "1"
2) "2"
3) "3"


//有序集合
redis 127.0.0.1:6379> zadd class:phprank 5 tom 添加集合
(integer) 1
redis 127.0.0.1:6379> zadd class:phprank 12 alex
(integer) 1
redis 127.0.0.1:6379> zadd class:phprank 6 jack
(integer) 1
redis 127.0.0.1:6379> zadd class:phprank 40 gatsby
(integer) 1
redis 127.0.0.1:6379> ZRANGE class:phprank 0 -1 //查询集合，只显示值
1) "tom"
2) "jack"
3) "alex"
4) "gatsby"
redis 127.0.0.1:6379> zrange class:phprank 0 -1 withscores //擦汗
1) "tom"
2) "5"
3) "jack"
4) "6"
5) "alex"
6) "12"
7) "gatsby"
8) "40"

