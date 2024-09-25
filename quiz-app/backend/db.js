const mongoose = require("mongoose");
const mongoURI ="<Put Your MongoDB connection URL>"


const mondoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log("Connected");
  
    const topics = mongoose.connection.collection("Topics");    
    const data = await topics.find({}).toArray();
    global.topic = data;
    console.log(data)
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = mondoDB;