import { Request, Response, NextFunction } from "express";
import {authServices} from "../services/auth.service";
import IUser from "../interface/user.interface";

class AuthController {
    registration = async (req: Request<{}, {},IUser>, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user = await authServices.registration(req.body);
          res.status(201).json({"success":true,"message":"registration successfully","data":user});
        } catch (error) {
          next(error);
        }
      };
}

export const authController = new AuthController();
