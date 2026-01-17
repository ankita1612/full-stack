import Clockin from '../models/clockin.model'
import IClockin from '../interface/clockin.interface'
import  Employee  from '../models/employee.model'
import mongoose,{Types} from "mongoose";

export class clockinService {
    
    async bulkClockin(payload: any) {        
        const records = payload;

        if (!Array.isArray(records) || records.length === 0) {
            throw new Error("Request body must be a non-empty array");
        }

        const bulkData = records.map((item, index) => {
            const { emp_id, clockin, clockout, entry_date } = item;

            if (!mongoose.Types.ObjectId.isValid(emp_id)) {
                throw new Error(`Invalid emp_id at index ${index}`);
            }

            const inTime = new Date(`${entry_date}T${clockin}:00`);
            const outTime = new Date(`${entry_date}T${clockout}:00`);

            if (outTime <= inTime) {
                throw new Error(
                `Clock-out must be greater than clock-in at index ${index}`
                );
            }

            const entryDate = new Date(entry_date);
            entryDate.setHours(0, 0, 0, 0);

            return {
                emp_id: new mongoose.Types.ObjectId(emp_id),
                clockin: clockin,
                clockout: clockout,
                entry_date: entryDate
            };
        });
        
        const saved = await Clockin.insertMany(bulkData, {ordered: true});
        return  saved        
    }
    async doClockin(payload: IClockin) {
        const { emp_id, clockin, clockout, entry_date } = payload;

        if (!emp_id || typeof emp_id !== "string") {
            throw new Error("Employee id missing or invalid");
        }

        if (!mongoose.Types.ObjectId.isValid(emp_id)) {
            throw new Error("Invalid employee id format");
        }

        const empObjectId = new mongoose.Types.ObjectId(emp_id);

        const empExist = await Employee.findById(empObjectId);
        if (!empExist) {
            throw new Error("Employee not exist");
        }
       
        const existingClockin = await Clockin.countDocuments({emp_id: empObjectId,clockin:clockin,entry_date:entry_date});

        if (existingClockin > 0) {
            throw new Error("Employee with same clock-in time already exists");
        }

        const data= Clockin.create({
            emp_id: empObjectId,
            clockin:clockin,
            clockout:clockout,
            entry_date:entry_date
        });

        return data;
    }

    async empWiseClockin(start_date : Date,end_date: Date) {
        const result =await Clockin.find({entry_date:{$gte:start_date,$lte:end_date}}).populate("emp_id")     
        const new_data = result.reduce<Record<string, IClockin[]>>((acc, s) => {
            if (!s.emp_id) {
                // optional: log or skip
                console.warn("Clockin without emp_id", s._id);
                return acc;
            }

            const empId = s.emp_id._id.toString();
            (acc[empId] ||= []).push(s);

            return acc;
            }, {});
        //  const new_data= result.reduce<Record<string, IClockin[]>>((a,s)=>{
        //         console.log(s.emp_id._id.toString());
        //         console.log(s.emp_id._id.toString());

                // const id=s.emp_id._id.toString()
                // console.log(id)
                // if(a[id] == undefined){
                //     a[id]=[]
                // }
                // else{
                //     a[id].push(s)
                // }
        //          return a
        // },{})        
        return new_data
    }   

    async missingClockin(id: string) {
      
    }
    async filterClockin(){
        const result =await Clockin.find().sort({emp_id:"desc"}).populate("emp_id")
        const new_data=result.filter((a)=>{
            if(a.clockin=="10:10" && a.emp_id._id.toString()=="696a2adf16e4ffcab92d3cd4")
               return true 
        })
        return new_data
    }
    async reducerClockin( ){
        return "reducerClockin"
    }
    async mapClockin( ){
        // const result =await Clockin.find().sort({emp_id:"desc"}).populate("emp_id", "name").lean()
        // const new_data = result.map((s)=>{
           
        //     const emp_id1=s.emp_id
        //     return {id:s.emp_id._id, id1:emp_id1 , name:emp_id1.name}
        // })
        const data = await Clockin.find().populate("emp_id", "name").lean();

        const new_data = data.map((s: IClockin) => {
            if (typeof s.emp_id === "string" || s.emp_id instanceof Types.ObjectId) {
                return null; // or handle non-populated case
            }

            return {
                id: s.emp_id._id,
                name: s.emp_id.name
            };
            });
        return new_data;
    }
    async foreachClockin(){
        return "foreachClockin"
    }

}

//export the class
const clockinServices = new clockinService()
export default clockinServices