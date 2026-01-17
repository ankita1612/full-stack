import  {Schema, model,} from 'mongoose'
import IClockin from '../interface/clockin.interface'
const clockinSchema = new Schema<IClockin>({
    emp_id:{     
      type: Schema.Types.ObjectId,
      ref: 'employee'
    },
    clockin: {
        type: String,        
    },
    clockout: {
        type: String,
    },
    entry_date: {
        type: Date,
    },
})

const Clockin = model<IClockin>('clockin', clockinSchema )
export default  Clockin