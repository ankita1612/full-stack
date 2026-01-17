//importing modules
import  {Schema, model,} from 'mongoose'
import IEvent from '../interface/event.interface'
const rowSchema = new Schema({
     name: {
        type:String
     },
    totalSeats:{
        type:Number
    }, 
    bookedSeats:{
        type:Number,
        default:0 
    }
});
const sectionSchema = new Schema({
     name: {
        type:String
     },
    rows:[rowSchema]
});
//Postschema
const eventSchema = new Schema<IEvent>({
    name: {
        type: String,        
    },
    date: {
        type: Date,
    },
    sections: [sectionSchema]   
})

//creating a model
 export const Event = model<IEvent>('Event', eventSchema )