//import module
import { Event, } from '../models/event.model'
import IEvents from '../interface/event.interface'

export class EventService {
    //create a Event
    async createEvent(data: IEvents) {
        try {
            const newEvent = await Event.create(data)
            return newEvent

        } catch (error) {
            console.log(error)
        }
    }

    async listEvent() {
        try {
            const newEvent = await Event.find()
            return newEvent

        } catch (error) {
            console.log(error)
        }
    }
}

//export the class
export const eventService = new EventService()