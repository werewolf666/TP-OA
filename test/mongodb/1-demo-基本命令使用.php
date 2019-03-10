/**
 * 安装的mongodb \mongod.exe --dbpath=c:\PHPWAMP_IN3\wwwroot\mongodb\mongo\db\ --logpath=c:\PHPWAMP_IN3\wwwroot\mongodb\mongo\log.txt --install
 * 使用 mongo.exe 客户端连接
 * 目前已启动
 */

//创建表 可以直接use 表名字，没有就创建
//数据插入
/**
> db.goods.insert({name:'huawei02',price:'1002',weight:131,number:5})
> db.goods.insert({name:'huawei03',price:'1003',weight:132,number:12})
> db.goods.insert({name:'huawei04',price:'1004',weight:134,number:22})
> db.goods.insert({name:'huawei05',price:'1005',weight:134,number:55})
 *
> db.goods.insert({name:'xiaomi01',price:'990',weight:123,number:12})
> db.goods.insert({name:'xiaomi02',price:'991',weight:124,number:10})
> db.goods.insert({name:'xiaomi03',price:'992',weight:125,number:20})
> db.goods.insert({name:'xiaomi04',price:'993',weight:128,number:80})
 * 插入数组信息[]，键值对信息{}
db.goods.insert({name:'sumsung01',prive:6999,weight:89,area:{proinven:'beijing',city:'zhongguanchun'},color:['gray','green','red']})
db.goods.insert({name:'sumsung02',prive:6998,weight:90,area:{proinven:'beijing',city:'zhongguanchun'},color:['gray','green','lightblue','red']})

*/

//查询方式
//db.goods.find() 全部数据
//db.goods.findOne()> db.goods.findOne()
//{
//        "_id" : ObjectId("5c83b0084491b73ac305e4d9"),
//        "name" : "huawei01",
//        "price" : "1000",
//        "weight" : 135,
//        "number" : 35
//db.goods.find({name:'huawei'})

//条件查询
//db.goods.find({weight:{'$gt':102}}) 大于
//db.goods.find({weight:{'$gte':102}}) 大于等于

//数组条件限制查询
//db.goods.find({color:'red'}),满足一个条件即可查询出来
// { "_id" : ObjectId("5c83b36b4491b73ac305e4e2"), "name" : "sumsung01", "prive" : 6999, "weight" : 89, "area" : { "proinven" : "beijing", "city" : "zhongguanchun" }, "color" : [ "gray", "green", "red" ] }
//{ "_id" : ObjectId("5c83b39b4491b73ac305e4e3"), "name" : "sumsung02", "prive" : 6998, "weight" : 90, "area" : { "proinven" : "beijing", "city" : "zhongguanchun" }, "color" : [ "gray", "green", "lightblue", "red" ] }

//db.goods.find({color:{'$all':['red','green']}}),满足两个条件即可查询出来
//{ "_id" : ObjectId("5c83b36b4491b73ac305e4e2"), "name" : "sumsung01", "prive" : 6999, "weight" : 89, "area" : { "proinven" : "beijing", "city" : "zhongguanchun" }, "color" : [ "gray", "green", "red" ] }
//{ "_id" : ObjectId("5c83b39b4491b73ac305e4e3"), "name" : "sumsung02", "prive" : 6998, "weight" : 90, "area" : { "proinven" : "beijing", "city" : "zhongguanchun" }, "color" : [ "gray", "green", "lightblue", "red" ] }

//排除查询
//db.goods.find({prive:1800},{name:1})//查询name字段，1表示查询该字段
//db.goods.find({price:'1800'},{name:1,_id:0}) //查询价格大于1800的过滤_id


//修改操作：update
//有$set 只修改设置的字段，其他字段没变，没有$set
//db.goods.update({name:'huawei01'},{'$set':{name:'huawei001'}})
//{ "_id" : ObjectId("5c83b0084491b73ac305e4d9"), "name" : "huawei001", "number" : 35, "price" : "1000", "weight" : 135 }

//没有指定$set,如果字段有，则修改字段，否则，添加新字段
//db.goods.update({name:'huawei001'},{name:'huawei001new'}) //直接修改字段
//{ "_id" : ObjectId("5c83b0084491b73ac305e4d9"), "name" : "huawei001new" } //结果
//db.goods.update({name:'huawei001new'},{name:'huawei001new_1',size:18}) //没有size字段，添加新字段
//{ "_id" : ObjectId("5c83b0084491b73ac305e4d9"), "name" : "huawei001new_1", "size" : 18 } //结果


//删除数据
//db.goods.remove({name:'huawei001new_1'}),简单暴力删除
//