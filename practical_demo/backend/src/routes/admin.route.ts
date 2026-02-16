import express from "express";
import { adminController } from '../controllers/admin.controller'
import { validateAdd, isRequestValidated, validateEdit, validateId } from '../validations/admin.validation'
const adminRouter = express.Router()
adminRouter.post('/',  validateAdd, isRequestValidated, adminController.addAdmin)
adminRouter.get('/',  adminController.getAdmins)
adminRouter.put('/:id', validateId, validateEdit, isRequestValidated, adminController.updateAdmin)
adminRouter.delete('/:id', validateId, adminController.deleteAdmin)
adminRouter.post('/test', adminController.testAdmin)
adminRouter.get('/serverPagination', adminController.getAdminsWithPagination)
adminRouter.get('/:id', validateId, adminController.getAdmin)

export default adminRouter;