import User from "../models/user.model";
import  IUser ,{ILoginResponse}  from "../interface/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export class AuthServices {
  async registration(data: IUser ): Promise<IUser | null | String> {
    const result  = await User.findOne({"email":data.email})
    if(result){
        throw new Error("user with email already exist")
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    let user = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      DOB: data.DOB
    });
    return user;
  }
  async login(data: IUser ): Promise<ILoginResponse | null | String> {
    const result  = await User.findOne({"email":data.email})
    if(!result){
        throw new Error("user not exist")
    }
    const passwordMatched = await bcrypt.compare(data.password, result.password );
    if(!passwordMatched){
        throw new Error("invalid password")
    }
    let token = await jwt.sign({"_id":result._id},process.env.SECRET_KEY||"")

    const userObj = result.toObject();
   // delete (userObj as any).password;

    return {
      user: userObj,
      token,
    };
  }
}
export const authServices = new AuthServices();

