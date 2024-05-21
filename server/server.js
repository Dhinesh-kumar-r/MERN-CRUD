import express from "express"
import cors from "cors"
import path from "path"
import databaseConnectivity from "./config/db.js"
import dotenv from "dotenv"
import { studentsRoute } from "./route/studentsRoute.js"
const  __dirname = path.resolve() 
dotenv.config({path:path.join(__dirname,"config/config.env")});

const app = express();
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials :true
}))
app.use("/api/v1",studentsRoute);


databaseConnectivity()
app.listen(process.env.PORT,()=>{
    console.log(`Server Connected On ${process.env.PORT} `);
})
