import { Request, Response, NextFunction } from "express";
import { employeeService } from "../services/employee.service";
import  IEmployee  from "../interface/employee.interface";
import { Types } from "mongoose";

class EmployeeController {
  addEmployee = async (req: Request<{}, {}, IEmployee>, res: Response, next: NextFunction): Promise<void> => {    
    try {
        const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };
//res.json(req.body.DOB)
      let singleImagePath = files?.single_image ? files.single_image[0].path : "";    
      const multiImagePaths = files?.multi_image ? files.multi_image.map(file => file.path): [];
      singleImagePath= singleImagePath.replace(/\\/g, "/")
     
      const employee = await employeeService.createEmployee({
          ...req.body,                  
          single_image: singleImagePath,
          multi_image: multiImagePaths,
          DOB: req.body.DOB,
      });
      res.status(201).json({"success":true,"message":"Employee created successfully","data":employee});
    } catch (error) {
      next(error);
    }
  };

  getEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {     
      const employees = await employeeService.getEmployees();
      res.status(200).json({"success":true,"message":"","data":employees});
    } catch (error) {
      next(error);
    }
  };

  getEmployee = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!Types.ObjectId.isValid(id)) {        
        const error: any = new Error("Invalid employee id");
        error.statusCode = 400;
        return next(error);
      }

      const employee = await employeeService.getEmployee(id);

      if (!employee) {        
        const error: any = new Error("Employee not found");
        error.statusCode = 400;
        return next(error);
      }

      res.status(200).json({success: true,data: employee,});
    } catch (error) {
      next(error); 
    }
};

  updateEmployee = async (req: Request<{ id: string }, {}, Partial<IEmployee>>, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        const error: any = new Error("Invalid employee id");
        error.statusCode = 400;
        return next(error);
      }
      const employee = await employeeService.updateEmployee(req.params.id, req.body);

      if (!employee) {
        const error: any = new Error("Employee not found");
        error.statusCode = 400;
        return next(error);
      }

      res.status(200).json({"success":true,"message":"Employee update successfully","data":employee});
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!Types.ObjectId.isValid(req.params.id)) {
        const error: any = new Error("Invalid employee id");
        error.statusCode = 400;
        return next(error);;
      }
      const employee = await employeeService.deleteEmployee(req.params.id);
      if (!employee) {
        const error: any = new Error("Employee not found");
        error.statusCode = 400;
        return next(error);
      }
      res.status(200).json({"success":true,"message":"Employee deleted successfully","data":[]});
    } catch (error) {
      next(error);
    }
  };
  
}
export const employeeController = new EmployeeController();
