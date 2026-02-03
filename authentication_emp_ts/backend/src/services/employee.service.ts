import Employee from "../models/employee.model";
import  IEmployee  from "../interface/employee.interface";
import { Types } from "mongoose";

export class EmployeeService {
  async createEmployee(data: IEmployee): Promise<IEmployee> {
    return Employee.create({
      title: data.title,
      single_image:data.single_image,
      multi_image: data.multi_image,    
      DOB:data.DOB
    });
  }

  async getEmployees(): Promise<IEmployee[]> {
    return Employee.find().sort({_id:-1});
  }

  async getEmployee(id: string): Promise<IEmployee | null> {   
    const employee = await Employee.findById(id);
    return employee;
  }

  async updateEmployee(id: string, data: Partial<IEmployee>): Promise<IEmployee | null> {
    const employee = Employee.findByIdAndUpdate(
      id,
      {
        title: data.title,
        DOB: data.DOB,
        ...(data.single_image && { single_image: data.single_image }),
        ...(data.multi_image && { multi_image: data.multi_image }),
      },
      { new: true }
    );   
    return employee;
  }

  // delete employee
  async deleteEmployee(id: string): Promise<IEmployee | null> {
    const employee = await Employee.findByIdAndDelete(id);
    return employee
  }
  async testEmployee(id: string): Promise<IEmployee | null> {
    const objectId = new Types.ObjectId(id);
    const data =Employee.findOne({"_id":objectId});
    return data;
  }
}

// singleton export
export const employeeService = new EmployeeService();
