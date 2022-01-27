import express from "express"
import Patients_controller from "../controller/patients_controller"
import tokenCheck from "../middleware/token_check"


const patient_route = express.Router()
const patient_controller = new Patients_controller()

patient_route.get("/patients",tokenCheck,patient_controller.Index)
patient_route.post("/patients",tokenCheck,patient_controller.Store)
patient_route.put("/patients/:id",tokenCheck,patient_controller.Update)
patient_route.delete("/patients/:id",tokenCheck,patient_controller.Destroy)
patient_route.get("/patients/:id",tokenCheck,patient_controller.Show)
patient_route.get("/patients/search/:name",tokenCheck,patient_controller.Search)
patient_route.get("/patients/status/:status",tokenCheck,patient_controller.Status)


export default patient_route