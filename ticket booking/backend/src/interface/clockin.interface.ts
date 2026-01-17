import { Types } from "mongoose";
import IEmployee from "./employee.interface";

interface ICheckin {
  emp_id: Types.ObjectId | IEmployee; 
  clockin: string;
  clockout: string;
  entry_date: Date;
}

export default ICheckin;