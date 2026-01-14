//importing modules
import express from "express";
import { EventController } from "../controllers/event.controller"

//initiating the router
export const eventRouter = express.Router()

//add post route
eventRouter.post('/',EventController.addEvent)

// //get posts
 eventRouter.get('/', EventController.getEvents)

// //get single post
eventRouter.get('/:id/:name', EventController.getEvent)

// //update a post
 eventRouter.post('/book-ticket', EventController.bookTicket)

// //delete a post
 eventRouter.delete('/:id', EventController.deleteEvent)