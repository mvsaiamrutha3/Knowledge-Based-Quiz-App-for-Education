const mongoose=require('mongoose')
const {Schema}=mongoose

const QueSchema=new Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:[String],
        required:true
    },
    correct:{
        type:String,
        required:true
    }
})

module.exports=QueSchema;