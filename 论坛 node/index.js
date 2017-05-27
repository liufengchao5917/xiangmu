var express=require('express');
var router=espress.Router();
router.get('/',function(req,res,next){
   res.render('index',{title:'第一个'})
});
router.get('/name',function(req,res,next){
   res.render('index',{title:'第二个'})
});
router.get('/login',function(req,res,next){
   if(req.query.username=='小红'){
		res.redirect('/name')
   }else{
		res.send("用户名或密码错误")
   }
   res.end();
});

router.get('/reg',function(req,res,next){
   
});

router.get('/zhuce',function(req,res,next){
   res.render('reg')
});

















