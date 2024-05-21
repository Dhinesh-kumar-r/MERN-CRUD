import express from "express"
import { CreateData, DeleteData, GetSingleData, ReadData, UpdateDetails } from "../controller/studentsController.js"

const studentsRoute = express.Router()

//Create Routing Details
studentsRoute.route("/add").post(CreateData);
studentsRoute.route("/get").get(ReadData);
studentsRoute.route("/update/:id").patch(UpdateDetails);
studentsRoute.route("/delete/:id").delete(DeleteData);
studentsRoute.route("/getuser/:id").get(GetSingleData);

export {studentsRoute}