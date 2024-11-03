const mongoose = require("mongoose");
const mongoURI ="mongodb+srv://mvsa:mvsa@cluster0.tfizzuc.mongodb.net/quizApp?retryWrites=true&w=majority&appName=Cluster0"


const mondoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected");
      const db = mongoose.connection.db;

    const topics = mongoose.connection.collection("topics");    
    const data = await topics.find({}).toArray();
    global.topic = data;
    console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = mondoDB;