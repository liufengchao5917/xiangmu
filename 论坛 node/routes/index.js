var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs=require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
    var m = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '111111',
        database: "world"
    });
    m.connect();
    m.query("select * from tou", function (err, data) {
        res.render('index2', {tt: data});
    });
    m.end();
    });


//网页的分割页list
router.get("/banzhu",function(req,res){
    var mysql_cli =  mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'111111',
        database:'world',
        port:3306
    });
    mysql_cli.connect();
    mysql_cli.query("select * from banzhu", function (err, data) {
        var mysql_cli = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '111111',
            database: "world",
            port:3306
        });
        mysql_cli.connect();
        mysql_cli.query("select * from pinglun", function (err, data1) {
            //console.log(data);
            //console.log(data1);
            res.render('banzhu', {bz:data,ps:data1});
        });
        mysql_cli.end();
    });
    mysql_cli.end();
});


router.get("/getData",function(req,res){
    var num = req.query.num;
    //res.json({"name":name})
    var mysql_cli =  mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'111111',
        database:'world',
        port:3306
    });
    mysql_cli.connect();
    num = (num -1)*5;
    mysql_cli.query("select * from banzhu limit ?,5", function (err, data) {
        var mysql_cli = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '111111',
            database: "world",
            port:3306
        });
        mysql_cli.connect();
        mysql_cli.query("select * from pinglun limit ?,5", function (err, data1) {
            res.render('banzhu', {bz:data,ps:data1});
            //res.json({bz:data,ps:data1});
        });
        mysql_cli.end();
    });
    mysql_cli.end();
});
//结束


router.get('/denglu/', function(req, res, next) {res.render('denglu');});
router.get('/fabiao/', function(req, res, next) {res.render('fabiao');});
router.get('/zhuce/', function(req, res, next) {res.render('zhuce');});
//注册
router.get('/zhuces/', function(req, res, next) {
    var uname = req.query.name;
    var password =  req.query.password;
    //var sele=123;
    var mysql_cli = mysql.createConnection({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'111111',
        database:'world'
    });
    mysql_cli.connect();
    mysql_cli.query("insert into user(name,password) values (?,?)",
        [uname,password],function(err,data){
             //console.log(data);
            if(!err){
                res.redirect('/denglu');
                router;
            }
        });
    mysql_cli.end();
});
//登录
router.get('/denglus',function(req,res){
    var name=req.query.name;
    var ages =  req.query.passwords;
    var mysql_cli = mysql.createConnection({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'111111',
        database:'world'
    });
    mysql_cli.connect();
    var user1="select * from user.name";
    mysql_cli.query(user1,function(err,data){
        if(user1.name==name){
            if (ages == data[0].password) {
                res.redirect('/');
            }
            else {
                res.render('denglu');
            }
        }else{
            res.render('denglu');

        }


    });
    mysql_cli.end();
});
//写入数据库
router.post("/tiezi",function(req,res){
    var c = req.body.content;
    var c1 = req.body.content1;
    var  mysql_cli = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'111111',
        port:3306,
        database:'world'
    });
    mysql_cli.connect();
    mysql_cli.query('insert into banzhu(name,zhuti)values(?,?)',[c,c1],function(err,data){

           res.json(data);

    });
    mysql_cli.end();
});





router.get("/tz",function(req,res){
    var  mysql_cli = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'111111',
        port:3306,
        database:'world'
    });
    mysql_cli.connect();
    mysql_cli.query('select * from banzhu where id=1',function(err,data){
        if(!err){
            //console.log(data);
            res.render('chenggong',{tz:data[0]});
        }
    });
    mysql_cli.end();
});


//router.get('/banzhu/', function(req, res, next) {res.render('banzhu');});
//banzhu写入页面   这个写入失败
//router.get('/banzhu', function(req, res, next) {
//    var m = mysql.createConnection({
//        host: '127.0.0.1',
//        user: 'root',
//        password: '111111',
//        database: "world"
//    });
//    m.connect();
//    m.query("select * from banzhu b,pinglun p where b.id=p.ida", function (err, data) {
//         //console.log(data)
//         res.render('banzhu', {bz:data,ps:data});
//
//    });
//    m.end();
//});

//双重写入表
//router.get('/banzhu', function(req, res, next) {
//    var m = mysql.createConnection({
//        host: '127.0.0.1',
//        user: 'root',
//        password: '111111',
//        database: "world"
//    });
//    m.connect();
//    m.query("select * from banzhu", function (err, data) {
//        var m = mysql.createConnection({
//            host: '127.0.0.1',
//            user: 'root',
//            password: '111111',
//            database: "world"
//        });
//        m.connect();
//        m.query("select * from pinglun", function (err, data1) {
//            res.render('banzhu', {bz:data,ps:data1});
//        });
//        m.end();
//    });
//    m.end();
//});




router.get('/houtai1s', function(req, res, next) {
    var m = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '111111',
        database: "world"
    });
    m.connect();
    m.query("select * from banzhu", function (err, data) {
        res.render('houtai1', {lt: data});
    });
    m.end();
});

router.get('/houtais',function(req,res){
    res.render("houtai")
});
router.get('/houtai3s',function(req,res){
    res.render("houtai3")
});


router.get('/dohoutai2',function(req,res){
    var  bname = req.query.bkname;
    var m = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:'111111',
        database:"world"
    });
    m.connect();
    m.query("insert into banzhu (name) values(?)",[bname],function(err,data){
        //console.log(data)
        if(!err){
            //res.send('添加成功')
            res.write('/success')
        }
    });
    m.end();
});


//发表评论
router.get('/banzhuone/:id',function(req,res){
    var mysql_cli = mysql.createConnection({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'111111',
        database:'world'
    });
    mysql_cli.connect();
    mysql_cli.query("select * from banzhu where id=?",[req.params.id],function(err,data){
        //console.log(data[0]);
        res.render('pinglun',{pl:data[0]});
    });
    mysql_cli.end();
});


//跳转回去banzhu
router.get('/pingluns1',function(req,res){
    var mysql_cli = mysql.createConnection({
        host:'127.0.0.1',
        port:3306,
        user:'root',
        password:'111111',
        database:'world'
    });
    var id =  req.query.id;
    var names =  req.query.names;
    mysql_cli.connect();
    mysql_cli.query("insert into pinglun (ida,pingluna) values (?,?)",
        [id,names],function(err,data){
            if (!err){
                res.redirect('/banzhu/');
            }
        });
    mysql_cli.end();
});




////写入文件获取后台数据
//router.get("/two2",function(req,res){
//    var m = mysql.createConnection({
//        host:'127.0.0.1',
//        user:'root',
//        password:'111111',
//        database:"world"
//    });
//    m.connect();
//    m.query("select * from banzhu",function(err,data){
//        res.render("two2",{lt:data})
//    })
//});
//
//
//
//router.get("/two1",function(req,res){
//    var m = mysql.createConnection({
//        host:'127.0.0.1',
//        user:'root',
//        password:'111111',
//        database:"world"
//    });
//    m.connect();
//    m.query("select * from banzhu",function(err,data){
//        res.render('two1',{bks:data});
//    })
//});









module.exports = router;