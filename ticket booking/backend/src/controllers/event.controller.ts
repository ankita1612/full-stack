//import modules
import { eventService } from '../services/event.service'
import { Request, Response } from 'express'

class eventController {
    addEvent = async (req: Request, res: Response) => {
        const data = req.body
        const post = await eventService.createEvent(data)
        res.status(201).send(post)        
    }
    getEvents = async (req: Request, res: Response) => {
        
        const post = await eventService.listEvent()
        res.status(201).send(post)        
    }
}

//export class
export const EventController = new eventController()