import {Types} from "mongoose";

interface Iemployee {
    _id: Types.ObjectId | string;
    name :string,    
}

export default Iemployee