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
// router.get('/:id', PostController.getAPost)

// //update a post
// router.put('/:id', PostController.updatePost)

// //delete a post
// router.delete('/:id', PostController.deletePost)