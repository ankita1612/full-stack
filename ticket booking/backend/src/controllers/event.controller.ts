//import modules
import { eventService } from '../services/event.service'
import { Request, Response, NextFunction } from "express";

class eventController {    
    addEvent = async (req: Request, res: Response, next:NextFunction) => {
        try{
            const data = req.body
            const post = await eventService.createEvent(data)
            res.status(201).json({success:true, message:'', data:post})       
        }
        catch(e)
        {
            next(e)
        }
    }
    getEvents = async (req: Request, res: Response, next:NextFunction) => {        
        try{
            const post = await eventService.listEvents()
            res.status(201).json({success:true, message:'', data:post})
        }
        catch(e){
            next(e)
        }
    }
    getEvent = async (req: Request<{ id: string; name: string }>, res: Response, next:NextFunction) => {  
        try{
            const id=req.params.id      
            const name=req.params.name 
            const post = await eventService.listEvent(id,name)
            res.status(201).json({success:true, message:'', data:post})
        }
        catch(e){
            next(e)
        }
    }
    deleteEvent= async (req: Request<{id: string}>, res: Response, next:NextFunction) => {
        try{
            const id = req.params.id
            const res1=await eventService.deleteEvent(id)
            res.status(201).json({success:true, message:'delete successa', data:res1})
        }
        catch(e){
            next(e)
        }
    }
    bookTicket = async (req: Request, res: Response, next:NextFunction) => {
        try{
            const res1=await eventService.bookTicket(req.body)
            res.status(201).json({success:true, message:'update success', data:res1})
        }
        catch(e){
            next(e)
        }
    }
}

//export class
export const EventController = new eventController()