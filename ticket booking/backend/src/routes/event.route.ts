import express from "express";
import { EventController } from "../controllers/event.controller"

const eventRouter = express.Router()
eventRouter.post('/',EventController.addEvent)
eventRouter.get('/', EventController.getEvents)
eventRouter.get('/:id/:name', EventController.getEvent)
eventRouter.post('/book-ticket', EventController.bookTicket)
eventRouter.delete('/:id', EventController.deleteEvent)

export default eventRouter