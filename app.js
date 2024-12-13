import express from "express";
import router from "./routes/route.js";
import connection from "./database.js";
import dotenv from 'dotenv'
dotenv.config()

connection()
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', router)



app.listen(port, () => {
  console.log('http://localhost:8080/api/getAllUsers');
});


