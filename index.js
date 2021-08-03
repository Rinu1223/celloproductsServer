const express=require('express'); //import express
const app=express();
const dataservice=require('./services/data.service'); // import data.service
const cors=require('cors'); //import cors
app.use(cors({
  origin:'http://localhost:4200', //client path 
  credentials:true  //to use cookies
}))

const session=require('express-session');//import session
app.use(session({
  secret:'randomsecurestring',
  resave:false,
  saveUninitialzed:false
}));
app.use(express.json());
const authMiddleware=(req,res,next)=>{
    if(!req.session.currentUser){
      return res.json({
        statusCode:401,
        status:false,
        message:"please login"
      })
    }
    else{
      next();
    }
  }
  app.listen(3000,()=>{
    console.log("server started at port :3000");
})
app.post('/register',(req,res)=>{
  dataservice.register(req.body.uID,req.body.username,req.body.password)
.then(result=>{
res.status(result.statusCode).json(result)
})
});
app.post('/login',(req,res)=>{
    //console.log(req.body);
    dataservice.login(req,req.body.uID,req.body.password)
    .then(result=>{
      res.status(result.statusCode).json(result); 
    })
       
    });
    app.post('/additem',(req,res)=>{
        //console.log(req.body);
        
        dataservice.additem(req,req.body.title,req.body.subTitle,req.body.description)
        .then(result=>{
          res.status(result.statusCode).json(result); 
        })
           
        });
        app.post('/displayProducts',(req,res)=>{
         dataservice.displayProducts(req)
          .then(result=>{
            res.status(result.statusCode).json(result); 
          })
             
          });
          app.post('/addToCart',(req,res)=>{
            dataservice.addToCart(req,req.body.title,req.body.uID)
             .then(result=>{
               res.status(result.statusCode).json(result); 
             })
                
             });
             app.post('/displayCartItems',(req,res)=>{
              dataservice.displayCartItems(req,req.body.uID)
               .then(result=>{
                 res.status(result.statusCode).json(result); 
               })
              });