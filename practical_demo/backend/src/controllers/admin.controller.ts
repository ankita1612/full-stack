import { Request, Response, NextFunction } from "express";
import { adminService } from "../services/admin.service";
import  IAdmin , {GetAdminsQuery}  from "../interfaces/admin.interface";
import { Types } from "mongoose";

class AdminController {
  addAdmin = async (req: Request<{}, {}, IAdmin>, res: Response, next: NextFunction): Promise<void> => {
    try {     
      const admin = await adminService.createAdmin(req.body);
      res.status(201).json({"success":true,"message":"Admin created successfully","data":admin});
    } catch (error) {         
      next(error);
    }
  };

  getAdmins = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {     
      const admins = await adminService.getAdmins();
      res.status(200).json({success: true,data: admins});
    } catch (error) {
      next(error);
    }
  };

  getAdmin = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;     
      const admin = await adminService.getAdmin(id);
      res.status(200).json({success: true,data: admin});
    } catch (error) {
      next(error); 
    }
};
 getAdminsWithPagination = async (req: Request, res: Response) => {
  const query: GetAdminsQuery = {
    search: req.query.search as string,
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
  };

  const admins = await adminService.getAdminsWithPagination(query);
  res.json(admins);
};
  updateAdmin = async (req: Request<{ id: string }, {}, Partial<IAdmin>>, res: Response, next: NextFunction): Promise<void> => {
    try {      
      const admin = await adminService.updateAdmin(req.params.id, req.body);
      res.status(200).json({"success":true,"message":"Admin updated successfully","data":admin});
    } catch (error) {
      next(error);
    }
  };

  deleteAdmin = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {     
      await adminService.deleteAdmin(req.params.id);     
      res.status(200).json({"success":true,"message":"Admin deleted successfully","data":[]});
    } catch (error) {
      next(error);
    }
  };

  testAdmin= async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await adminService.testAdmin(req.body.id);
      res.status(200).json({"success":true,"message":"Admin deleted successfully","data":data});
    } catch (error) {
      next(error);
    }
  };
}
export const adminController = new AdminController();