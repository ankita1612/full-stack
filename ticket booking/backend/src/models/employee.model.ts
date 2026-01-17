import  {Schema, model,} from 'mongoose'
import IEmployee from '../interface/employee.interface'
const employeeSchema = new Schema<IEmployee>({
    name: {
        type: String,        
    }
})

const Employee = model<IEmployee>('employee', employeeSchema )
export default Employee;