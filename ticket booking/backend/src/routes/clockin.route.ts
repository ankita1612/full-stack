//importing modules
import express from "express";
import { ClockinController } from "../controllers/clockin.controller"
import {addClockin,isRequestValidated} from "../validations/clockin.validation"
//initiating the router
const clockinRouter = express.Router()

//add post route
clockinRouter.post('/clockin', addClockin,isRequestValidated, ClockinController.doClockin)
clockinRouter.post('/bulk-clockin', ClockinController.bulkClockin)
//emp wise clockin
clockinRouter.post('/empwise-clockin',ClockinController.empWiseClockin)

clockinRouter.post('/missing-clockin',ClockinController.missingClockin)
clockinRouter.post('/filter-demo',ClockinController.filterClockin)
clockinRouter.post('/reducer-demo',ClockinController.reducerClockin)
clockinRouter.post('/map-demo',ClockinController.mapClockin)
clockinRouter.post('/foreach-demo',ClockinController.foreachClockin)

export default clockinRouter