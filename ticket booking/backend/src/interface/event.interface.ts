import { Types} from 'mongoose';

interface IRows {
    _id?: Types.ObjectId | string;/////////////////
    name: string,
    totalSeats: number,
    bookedSeats?:number;/////////////////
}
interface ISections {
    _id?: Types.ObjectId | string; 
    name: string;
    rows?: IRows[];
}
interface IEvent {
    name: string,
    date : Date,
    sections: ISections[],
}
export default IEvent