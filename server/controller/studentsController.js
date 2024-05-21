import studentsModel from "../model/studentsModel.js";

//Create Students Details
const CreateData = async(req,res)=>{
    const {name,email,phone,enrollno, admissiondate} = req.body
    try{
        const addDetails = await studentsModel.findOne({enrollno})
        if(addDetails){
            res.json({
                status:false,
                msg:"Data_Already_Exist"
            })
        }
        else{
            const addData = new studentsModel({name,email,phone,enrollno,admissiondate})
            await addData.save();
            res.status(201).json({
                status:true,
                msg:"added",
                addData
            })
        }
    }
    catch(err){
        res.json({msg:"create_error"})
    }
}

//Read Student Data

const ReadData= async(req,res)=>{
    const studentsData = await studentsModel.find({})
    try{
        if(!studentsData){
            res.status(400).json({
                msg:"Not_Exist"
            })
        }
        else{
            res.status(200).json({
                status:true,
                msg:"Read_Sucessfully",
                studentsData
            })
        }
    }
    catch(err){
        res.json({msg:"read_error"})
    }
}

//get One Data 
const GetSingleData = async(req,res)=>{
    const {id} = req.params
    try{
        const studentData = await studentsModel.findById(id)
        if(!studentData){
            res.status(400).json({
                msg:"invalid_inout"
            })
        }
        else{
            res.status(201).json({
                msg:"get_sucessfully",
                studentData
            })
        }
    }
    catch(err){
        res.json({msg:"single_data_error"})
    }
}
//Update Student Details

const UpdateDetails = async(req,res)=>{
    const {id} = req.params
   try{
        const updateData = await studentsModel.findByIdAndUpdate({_id:id},{...req.body})
        if(!updateData){
            res.status(400).json({msg:"invalidInput"})
        }
        else{
            res.status(200).json({
                status:true,
                msg:"data_Updated",
                updateData
            })
        }
   }
   catch(err){
        res.json({
            msg:"update_error"
        })
   }
}

//Delete Details

const DeleteData = async(req,res)=>{
    const {id} = req.params
    const deleteData =await studentsModel.findByIdAndDelete(id)
    try{
        if(!deleteData){
            res.status(400).json({msg:"invalid_details"})
        }
        else{
            res.status(200).json({
                status:true,
                msg:"data_Deleted"
            })
        }
    }
    catch(err){
        res.json({msg:"delete_error"})
    }
    
} 
export {CreateData,ReadData,GetSingleData,UpdateDetails,DeleteData}