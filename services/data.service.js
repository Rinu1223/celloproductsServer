const db=require('./db');
const products = require('../models/products');
const cartItems = require('../models/cartItem');
let currentUser=""
const register=(uID,userName,password)=>{
  return db.User.findOne({uID})
  .then(user=>{
    if(user){
      return{
        statusCode:422,
        status:false,
        message:"user exit"
      }
    }
    else{
      const newUser=new db.User({
        uID,
        username:userName,
        password:password,
        
      })
      newUser.save();
      return{
        statusCode:200,
        status:true,
        message:"successfully registered"
      }
    }
  })
}
const login=(req,uid,paswd)=>{
    let password=paswd
    let uID=parseInt(uid);
    return db.User.findOne({uID,password})
   .then(user=>
     {
       if(user){
         req.session.currentUser=uID
         return{
           statusCode:200,
           status:true,
           name:user.username,
           uid:uID,
           message:"Successfully login"
       } 
       }
       else{
     
         return {
           statusCode:422,
           status:false,
          message:"invalid accont number"
         }
       }
     })
   }
  
   
   const additem=(req,title,subtitle,description)=>{
       let Name=title;
    return products.Product.findOne({Name})
    .then(result=>{
      if(result){
        return {
          statusCode:422,
          status:false,
         message:"product exit..."
      }
      }
      else{
        const newProduct=new products.Product({
            Name:title,
            subtitle:subtitle,
            description:description
          
        })
        newProduct.save()
        return{
          statusCode:200,
            status:true,
            message:"Product Added Successfully"
        }
      }
    })
  }
  const addToCart=(req,title,uID)=>{
    let Name=title;
 return products.Product.findOne({Name})
 .then(result=>{
   if(!result){
     return {
       statusCode:422,
       status:false,
      message:"product not exit..."
   }
   }
   else{
     const newProduct=new cartItems.Cartitem({
         uID:uID,
         Name:title,
         subtitle:result.subtitle,
         description:result.description
       
     })
     newProduct.save()
     return{
       statusCode:200,
         status:true,
         message:"Product Added to Cart Successfully"
     }
   }
 })
}
  const displayProducts=()=>{
   
 return products.Product.find({})
 .then(result=>{
   if(!result){
     return {
       statusCode:400,
       status:true,
      message:"no products..."
   }
   }
   else{
     return{
       statusCode:200,
         status:true,
         message:result
     }
   }
 })
}
const displayCartItems=(req,uID)=>{
   
  return cartItems.Cartitem.find({uID})
  .then(result=>{
    if(!result){
      return {
        statusCode:400,
        status:true,
       message:"Cart is Empty..."
    }
    }
    else{
      return{
        statusCode:200,
          status:true,
          message:result
      }
    }
  })
 }
  
   module.exports={
       login,
       additem,
       displayProducts,
       addToCart,
       displayCartItems,
       register
       
   }