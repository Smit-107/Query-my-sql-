var express = require('express');
var mysql = require('mysql');

var app = express();
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"demo_query"
});

con.connect();

app.get('/',function(req,res){
    var intrest_query = "select * from query_demo";
    con.query(intrest_query,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/insert',function(req,res){
    var intrest_query = "insert into query_demo(name,email,password)values('admin','smit@gmail.com','1234')";
    var update_query1 ="insert into query_demo1(age,weight)values('12','67')";

    con.query(intrest_query,function(error,result,field){
        if(error) throw error;
        res.redirect('/');
    })
    con.query(update_query1,function(error,result,field){
        if(error) throw error;
    })
})

app.get('/delete/:id',function(req,res){
    var id = req.params.id;
    var delet_query = "delete from query_demo where id="+id;

    con.query(delet_query,function(error,result,field){
        if(error) throw error;
        res.redirect('/');
    })
})

app.get('/update/:id',function(req,res){
    var id = req.params.id;
    var update_query = "update query_demo set name='demo' , email='&' , password='123' where id="+id;
    con.query(update_query,function(error,result,field){
        if(error) throw error;
        res.redirect('/');
    })
    
})

app.get('/columview',function(req,res){
    var columview = "select password from query_demo";
    con.query(columview,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/idDetails/:id',function(req,res){
    var id = req.params.id
    var idDetails = "select * from query_demo where id="+id;
    con.query(idDetails,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/colidDetails/:id',function(req,res){
    var id = req.params.id
    var colidDetails = "select email from query_demo where id="+id;
    con.query(colidDetails,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/Search',function(req,res){
    var colidDetails = "select * from query_demo where password like '123%' ";
    con.query(colidDetails,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/limit',function(req,res){
    var limit = "select * from query_demo limit 1,2";
    con.query(limit,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/range',function(req,res){
    var orderBy = "desc"; 
    var limit = "select * from query_demo ORDER BY password " + orderBy;
    // var limit = "select * from query_demo password order by asc";
    con.query(limit,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})

app.get('/tabel',function(req,res){
    var tabel = "select query_demo. * , query_demo1. * from query_demo inner join query_demo1 on query_demo.password = query_demo1.age";
    con.query(tabel,function(error,result,field){
        if(error) throw error;
        res.send(result);
    })
})


app.listen(2003)