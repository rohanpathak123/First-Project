const express = require('express');
const app = express();
const mysql = require('mysql');
var session = require('express-session');
app.set('view engine','ejs');

var bodyParser = require('body-parser');
const urlencoder = bodyParser.urlencoded({ extended: false });
app.use(session({secret: 'mysupersecret',resave: false, saveUninitialized: false}));



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '14012000',
  database: 'dbms_project'
});

app.use('/assets',express.static('Assets'));
app.get('/assets/signup',(req,res)=>{
  res.sendFile(__dirname+'/register.html');
});
app.post('/assets/signup/home',urlencoder,(req,res)=>{
  let sql = 'INSERT INTO customer SET ?';
  console.log(JSON.stringify(req.body));
  data = {
    email: req.body.email,
    cust_name: req.body.name,
    address: req.body.address ,
    mob: parseFloat(req.body.mob),
    pass: req.body.password
  }

  db.query(sql,data,(err,result_fields)=>{
    if(err) res.render('signup_failed');
    else {
      let sql_2 = 'SELECT * FROM product';
      db.query(sql_2,(err,result)=>{
        if(err) throw err;
        res.render('home2',{data:result});
      });
    } 
  });
});

app.get('/assets/signin',(req,res)=>{
  res.sendFile(__dirname + '/login.html');
});

app.post('/assets/signin/home',urlencoder,(req,res)=>{
  var mail = req.body.mail;
  var pass = req.body.password;
  if((mail==='admin')&&(pass==='admin'))
  {
    res.sendFile(__dirname + '/admin_options.html');
  }
  else
  {
  let sql = 'SELECT * FROM customer WHERE email = ? AND password = ?';
  db.query(sql,[mail,pass],(err,result)=>{
    if(result===undefined) res.render('signin_failed'); 
  });
  let sql_3  = 'SELECT * FROM product';
  db.query(sql_3,(err,result)=>{
    console.log(JSON.stringify(result));
    res.render('home2',{data: result});
  });
  }
});

app.get('/assets/home',(req,res)=>{
  let sql = 'SELECT * FROM product';
  db.query(sql,(err,result)=> {
    if(err) throw err;
    res.render('home2',{data: result})
  });
});

app.get('/assets/contact',(req,res)=>{
    res.sendFile(__dirname + '/our_team.html');
});

app.get('/assets/cart',(req,res)=>{
  res.sendFile(__dirname + '/purchase.html');
}); 
app.get('/assets/payment_options',(req,res)=>{
  res.sendFile(__dirname + '/payment_options.html')
});
app.get('/assets/card_info',(req,res)=>{
  res.sendFile(__dirname + '/card_details.html');
});
app.get('/assets/add_product',(req,res)=>{
  res.sendFile(__dirname + '/add_product.html')
});
app.post('/assets/add_product',urlencoder,(req,res)=>{
  data = {
    prod_name: req.body.product_name,
    rate: parseFloat(req.body.rate),
    discount: parseFloat(req.body.discount),
    stock: parseFloat(req.body.stock),
    url: req.body.url,
    category: req.body.category

  }
  let sql = 'INSERT INTO PRODUCT SET ?';
  db.query(sql,data,(err,result)=>{
    if(err) throw err;
    res.sendFile(__dirname + '/product_addition_successful.html');
  })
  let sql_2 = 'update product set cost = rate - ceil(discount*rate/100)';
  db.query(sql_2,(err,result)=>{
    console.log(JSON.stringify(result));
  });
});

app.post('/assets/update',urlencoder,(req,res)=>{
  var id = req.body.product_id;
  var attr = req.body.feature;
  var val = req.body.new_value;
  if(attr==='stock') {
  let sql = 'UPDATE product SET stock = ? WHERE product_id = ?';
  db.query(sql,[parseFloat(val),parseFloat(id)],(err,result)=>{
    if(err) throw err;
    res.sendFile(__dirname + '/edit_product_success.html');
  });
}
  else if(attr==='Name') {
    let sql = 'UPDATE product SET prod_name = ? WHERE product_id = ?';
    db.query(sql,[parseFloat(val),parseFloat(id)],(err,result)=>{
      if(err) throw err;
      res.sendFile(__dirname + '/edit_product_success.html');
  });
  
}
  else if(attr==='discount') {
    let sql = 'UPDATE product SET discount = ? WHERE product_id = ?';
    db.query(sql,[parseFloat(val),parseFloat(id)],(err,result)=>{
      if(err) throw err;
      res.sendFile(__dirname + '/edit_product_success.html');
  });
  let sql_2 = 'update product set cost = rate - ceil(discount*rate/100)';
  db.query(sql_2,(err,result)=>{
    console.log(JSON.stringify(result));
  });
}
  else if(attr==='rate') {
      let sql = 'UPDATE product SET rate = ? WHERE product_id = ?';
      db.query(sql,[attr,parseFloat(val),parseFloat(id)],(err,result)=>{
        if(err) throw err;
        res.sendFile(__dirname + '/edit_product_success.html');
    });
    let sql_2 = 'update product set cost = rate - ceil(discount*rate/100)';
  db.query(sql_2,(err,result)=>{
    console.log(JSON.stringify(result));
  });
  }
  else if(attr==='category') {
    let sql = 'UPDATE product SET category = ? WHERE product_id = ?';
    db.query(sql,[attr,val,parseFloat(id)],(err,result)=>{
      if(err) throw err;
      res.sendFile(__dirname + '/edit_product_success.html');
  });
  }
  else if(attr==='url') {
    let sql = 'UPDATE product SET url = ? WHERE product_id = ?';
    db.query(sql,[attr,val,parseFloat(id)],(err,result)=>{
      if(err) throw err;
      res.sendFile(__dirname + '/edit_product_success.html');
  });
  }
});



app.get('/assets/update',(req,res)=>{
  res.sendFile(__dirname + '/edit_product.html');
});

app.post('/assets/delete_product',urlencoder,(req,res)=>{
  var id = parseFloat(req.body.product_id);
  let sql = 'DELETE FROM product WHERE product_id = ?';
  db.query(sql,[id],(err,result)=>{
    if(err) throw err;
    res.sendFile(__dirname + '/delete_product_success.html');
  });
});

app.get('/assets/delete_product',urlencoder,(req,res)=>{
  res.sendFile(__dirname + '/delete_product.html');
});



app.listen(3000,()=>{
  console.log('Connected to port 3000...');
})
