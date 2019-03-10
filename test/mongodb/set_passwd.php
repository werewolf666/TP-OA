创建管理员数据库
>use admin
switched to db admin

创建管理员表
> db.addUser('root','root')
{ "n" : 0, "connectionId" : 2, "err" : null, "ok" : 1 }
{
"user" : "root",
"readOnly" : false,
"pwd" : "2a8025f0885adad5a8ce0044070032b3",
"_id" : ObjectId("5c854625458f9d707131ef81")
}

//创建普通用户
use test
1；小明
2；小红

//关闭服务，卸载服务：mongod.exe --dbpath=c:\PHPWAMP_IN3\wwwroot\mongodb\mongo\db\ --logpath=c:\PHPWAMP_IN3\wwwroot\mongodb\mongo\log.txt --remove
//增加二级参数的安装服务
mongod.exe --dbpath=c:\PHPWAMP_IN3\wwwroot\mongodb\mongo\db\ --logpath=c:\PHPWAMP_IN3\wwwroot\mongodb\mongo\log.txt --install --auth

