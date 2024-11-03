const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const QueSchema=require('../Models/Question')
const Topic=require('../Models/Topic')
const { body, validationResult } = require('express-validator');

router.post('/addque/:topic', [
    body('questions', 'Questions is required').isArray(),
    body('questions.*.question', 'Question is required').notEmpty(),
    body('questions.*.options', 'Options must be an array').isArray(),
    body('questions.*.correct', 'Answer is required').notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const topic = req.params.topic;
        const questions = req.body.questions; // Get the array of questions

        // Map the questions to match the schema
        const questionDocuments = questions.map(q => ({
            question: q.question,
            options: q.options,
            correct: q.correct
        }));

        // Use insertMany to add all questions at once
        const newQuestions = await mongoose.model(topic, QueSchema).insertMany(questionDocuments);

        res.status(201).json({ success: true, newQuestions });
    } catch (error) {
        console.error("Error adding questions:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


router.post('/create/topic',[
    body('name', 'Name is required').notEmpty(),
    body('count', 'Total Que must be an array').notEmpty(),
    body('img', 'Answer is required').notEmpty(),
],async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const newTopic=await Topic.create({
            name:req.body.name,
            count:req.body.count,
            total:req.body.count*10,
            img:req.body.img,
            cName:(req.body.name).toLowerCase()+"s"
        })

        res.status(201).json({ success: true, newTopic });
        
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ success: false, message: 'Server Error' });
        
    }
})



module.exports = router;