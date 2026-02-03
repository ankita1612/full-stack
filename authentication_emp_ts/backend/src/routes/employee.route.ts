import express from "express";
import { employeeController } from '../controllers/employee.controller'
import { validateAdd, isRequestValidated,validateEdit } from '../validations/employee.validations'
const employeeRouter = express.Router()
import { upload } from "../middleware/upload.middleware";
import {m_upload} from "../middleware/multiupload.middleware";
employeeRouter.post('/', m_upload.fields([
    { name: 'single_image', maxCount: 1 },
    { name: 'multi_image', maxCount: 5 }
  ]),validateAdd,isRequestValidated, employeeController.addEmployee)
employeeRouter.get('/',employeeController.getEmployees)
employeeRouter.get('/:id', employeeController.getEmployee)
employeeRouter.put('/:id', validateEdit, isRequestValidated, employeeController.updateEmployee)
employeeRouter.delete('/:id', employeeController.deleteEmployee)


export default employeeRouter;