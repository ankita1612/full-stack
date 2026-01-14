//import module
import { Event, } from '../models/event.model'
import IEvents from '../interface/event.interface'
import mongoose,{Error, Types} from 'mongoose';

export class EventService {
    //create a Event
    async createEvent(data: IEvents) {
        try {
            console.log(data)
            const newEvent = await Event.create(data)
            return newEvent

        } catch (error) {
            console.log(error)
        }
    }
    async listEvents() {
        try {
            const newEvent = await Event.find()
            return newEvent

        } catch (error) {
            console.log(error)
        }
    }
    async listEvent(id: string, name: string) {
        try {
            console.log(name);

            const event = await Event.findById(id);
            return event;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async deleteEvent(id: string) {            
        if (!Types.ObjectId.isValid(id)) {
            throw new Error("Invalid Event ID");
        }
        const objectId = new mongoose.Types.ObjectId(id)
        const exist = await Event.countDocuments({_id:objectId})   
        if(!exist){
            throw new Error("Event ID not exist");
        }
        const post = await Event.findByIdAndDelete(objectId)                    
        return post          
    }    
    async bookTicket(data:any) {            
        
        const id = new mongoose.Types.ObjectId(data.id)
        const section_id = data.section_id
        const row_id = data.row_id
        const seat_book =  data.seat_book
        const event_data = await Event.findOne(
            {"_id" : id , "sections._id":section_id }
        )   
        const selected_sections=event_data?.sections.filter((s)=>{                 
                return s._id==section_id
            }
        )
        if(!selected_sections){
            throw new Error("Section not exist");
        }
        
        if(selected_sections?.[0]?.rows?.length==0){
            throw new Error("Rows not exist");
        }   
      
       const selected_rows=selected_sections?.[0]?.rows?.filter((s)=>{ 
                console.log(s._id+"=="+row_id+"~~>"+s._id==row_id)
                return s._id==row_id
            }
        )
        if(selected_rows==undefined || selected_rows.length==0){
            throw new Error("row not exist");
        }
        const totalSeats: number | undefined  =Number(selected_rows?.[0]?.totalSeats)
        let newTotalSeats: number  = totalSeats - seat_book
        
         if(newTotalSeats >= 0){
            
            let newBookedSeats=selected_rows?.[0]?.bookedSeats+seat_book
            
            const updated_result= await Event.findOneAndUpdate(
                { _id: id },
                { $set: { "sections.$[outer].rows.$[inner].totalSeats": newTotalSeats,
                        "sections.$[outer].rows.$[inner].bookedSeats": newBookedSeats
                } },
                { arrayFilters: [{ "outer._id": section_id }, { "inner._id": row_id }], new: true }
            );
            return updated_result;
         }
         else{
             throw new Error("Not enough seats available");
         }
            
        
        
        
        // if(!exist){
        //     throw new Error("Event ID not exist");
        // }
        // const post = await Event.findByIdAndDelete(objectId)                    
        // return post          
    }        
}

//export the class
export const eventService = new EventService()