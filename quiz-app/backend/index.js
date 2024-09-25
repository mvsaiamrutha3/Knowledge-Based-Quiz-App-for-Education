const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())
app.use('/api',require('./Routes/FetchData'))
app.use('/api',require('./Routes/UserHandle'))
app.get('/', (req, res) => {
    res.send('Hello World!')
})
mongoDB()
 app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })