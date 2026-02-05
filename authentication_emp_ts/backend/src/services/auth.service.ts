import User from "../models/user.model";
import  IUser ,{ILoginResponse, ILogin}  from "../interface/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import  ApiError  from "../utils/api.error";
export class AuthService {
  async register(data: IUser ): Promise<IUser> {
    const result  = await User.findOne({"email":data.email})
    if(result){      
      throw new ApiError("User with email already exist", 409);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    let user = await User.create({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      password: hashedPassword,
      DOB: data.DOB,
      profile_image: data.profile_image
    });
    return user;
  }
  async login(data: ILogin ): Promise<ILoginResponse | null | String> {
    const result  = await User.findOne({"email":data.email})
    if(!result){        
        throw new ApiError("User not exist", 404);        
    }
    const passwordMatched = await bcrypt.compare(data.password, result.password );
    if(!passwordMatched){        
        throw new ApiError("Invalid password", 401);
    }

    if (!process.env.JWT_SECRET) {
      throw new ApiError("JWT_SECRET not configured",500);
    }
    let token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const userObj = result.toObject();
   // delete (userObj as any).password;

    return {
      user: userObj,
      token,
    };
  }
}
export const authService = new AuthService();