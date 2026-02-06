import { Request, Response, NextFunction } from "express";
import {authService} from "../services/auth.service";
import IUser from "../interface/user.interface";
import  ApiError  from "../utils/api.error";

class AuthController {
    register = async (req: Request<{}, {},IUser>, res: Response, next: NextFunction): Promise<void> => {
      try {        
        const user = await authService.register({
            ...req.body,
            profile_image: req.file?.path
        });
        res.status(201).json({"success":true,"message":"registration successfully","data":user});
      } catch (error : any) {        
        next(error);
      }
    };

    login = async (req: Request<{}, {},IUser>, res: Response, next: NextFunction): Promise<void> => {
        try {
          const response = await authService.login(req.body);
          const { user, accessToken, refreshToken } = response as { user: any; accessToken: string; refreshToken: string };

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          res.status(200).json({"success":true,"message":"login successfully","data":{ user, accessToken }});

        } catch (error:any) {         
          next(error);
        }
      };
    
    refresh = async ( req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.cookies?.refreshToken;
          if (!token) 
            return next(new ApiError("No refresh token", 401));

        const accessToken = await  await authService.refreshAccessToken(token);

        res.json({ accessToken });
      } catch (err) {
        next(err);
      }
    }
}

export const authController = new AuthController();
