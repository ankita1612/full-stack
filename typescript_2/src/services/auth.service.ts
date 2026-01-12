import User from "../models/user.model";
import  IUser  from "../interface/user.interface";
import bcrypt from "bcrypt";

import { Types } from "mongoose";

export class AuthServices {
  async registration(data: IUser ): Promise<IUser | null | String> {
    const result  = await User.findOne({"email":data.email})
    if(result)
        throw new Error("user with email already exist")
      const hashedPassword = await bcrypt.hash(data.password, 10);
  
   let user = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            DOB: data.DOB
  });
  const userObj = user.toObject();
delete userObj.password;

return userObj;
    //return res.json("hai")
    //return User.findOne();
  }
}

// singleton export
//export default AuthServices;
export const authServices = new AuthServices();

