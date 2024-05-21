import mongoose from "mongoose";

const studentsSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    enrollno:Number,
    admissiondate:String
})

const studentsModel = mongoose.model("students",studentsSchema)

export default studentsModel