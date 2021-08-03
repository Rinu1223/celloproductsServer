const mongoose =require("mongoose") //import mongoose

//connection string
mongoose.connect('mongodb://localhost:27017/CelloProducts',{
useNewUrlParser:true,
useUnifiedTopology:true,
})

//model

const Product=mongoose.model('Product',{
    Name:String,
    subtitle:String,
    description:String
    
})

//export
module.exports={

Product
}