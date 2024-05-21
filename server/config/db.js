import mongoose from "mongoose";

let databaseConnectivity = ()=>{
    mongoose.connect(process.env.DATABASE)
    .then(res=>console.log("DataBase Conncted"))
    .catch(err=>console.log("DataBase Not Connected"))
}

export default databaseConnectivity