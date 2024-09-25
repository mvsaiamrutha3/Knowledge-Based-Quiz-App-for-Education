const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')

router.post('/Topics',(req,res)=>{
    try {
        res.send(global.topic)
    } catch (error) {
        console.error(error.message)
        res.send('Server Error')
        
    }
})

router.get('/Topics/:name',async(req,res)=>{
    const collName=req.params.name
    try {
    const questions = mongoose.connection.collection(collName);    
    const data = await questions.find({}).toArray();
    res.json(data)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
        
    }
})

module.exports=router