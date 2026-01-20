import { Request, Response, NextFunction } from "express";
import {authService} from "../services/auth.service";
import IUser from "../interface/user.interface";

class AuthController {
    registration = async (req: Request<{}, {},IUser>, res: Response, next: NextFunction): Promise<void> => {
      try {        
        const user = await authService.registration({
            ...req.body,
            profile_image: req.file?.path
        });
        res.status(201).json({"success":true,"message":"registration successfully","data":user});
      } catch (error : any) {
        if (error.message === 'USER_ALREADY_EXISTS') {
          res.status(409).json({"success":false, message: 'User with email already exist' ,"data":[]});
          return 
        }
        next(error);
      }
    };

    login = async (req: Request<{}, {},IUser>, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user = await authService.login(req.body);
          res.status(201).json({"success":true,"message":"login successfully","data":user});
        } catch (error:any) {
          if (error.message === 'USER_NOT_EXISTS') {
            res.status(409).json({"success":false, message: 'User not exist' ,"data":[]});
          return 
          }
          else if (error.message === 'INVALID_PASSWORD') {
            res.status(409).json({"success":false, message: 'Invalid password' ,"data":[]});
            return 
        }
          next(error);
        }
      };
}

export const authController = new AuthController();
