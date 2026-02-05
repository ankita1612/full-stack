import { Request, Response, NextFunction } from "express";
import {authService} from "../services/auth.service";
import IUser from "../interface/user.interface";

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
          const user = await authService.login(req.body);
          res.status(200).json({"success":true,"message":"login successfully","data":user});
        } catch (error:any) {         
          next(error);
        }
      };
}

export const authController = new AuthController();
