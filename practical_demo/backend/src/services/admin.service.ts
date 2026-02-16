import Admin from "../models/admin.model";
import  IAdmin  from "../interfaces/admin.interface";
import  ApiError  from "../utils/api.error";
import { Types } from "mongoose";

export class AdminService {
  async createAdmin(data: IAdmin): Promise<IAdmin> {

    const email = data.email.toLowerCase().trim();    
    const existing = await Admin.findOne({ email: email });    
    if(existing){          
      throw new ApiError("Email already used", 409);     
    }    
    return Admin.create({
      title: data.title,
      email:data.email,
      description: data.description,
      author: data.author,
      published: data.published,
      option_type: data.option_type,
      skills:Array.isArray(data.skills) ? data.skills : [],
      tags:Array.isArray(data.tags) ? data.tags : [],
      createdAt:new Date()
    });
  }

  async getAdmins(): Promise<IAdmin[]> {
    return Admin.find().sort({_id:-1});
  }
 async getAdminsWithPagination(query: {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) {
  const {
    search = '',
    page = 1,
    limit = 10,
    sortBy = '_id',
    sortOrder = 'desc',
  } = query;

  const skip = (page - 1) * limit;

  const searchQuery = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      }
    : {};

  const sortOptions: any = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const [data, total] = await Promise.all([
    Admin.find(searchQuery)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit),

    Admin.countDocuments(searchQuery),
  ]);

  return {
    data,
    total,
    page,
    limit,
  };
}
  async getAdmin(id: string): Promise<IAdmin | null> {   
    if (!Types.ObjectId.isValid(id)) { 
        throw new ApiError("Invalid admin id", 400);            
      }
    const admin = await Admin.findById(id);
    if (!admin) {        
        throw new ApiError("Admin not found", 404);
    }
    return admin;
  }

  async updateAdmin(id: string, data: Partial<IAdmin>): Promise<IAdmin | null> {
    if (!Types.ObjectId.isValid(id)) { 
        throw new ApiError("Invalid admin id", 400);            
      }
      if (data.email) {
        const exists = await Admin.findOne({ email: data.email, _id: { $ne: id } });
        if (exists) {
          throw new ApiError("Email already used", 409);
        }
      }  
    const admin = await Admin.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });   
    if (!admin) {
      throw new ApiError("Admin not found", 404);
    }
    return admin;
  }
  
  async deleteAdmin(id: string): Promise<IAdmin | null> {
    if (!Types.ObjectId.isValid(id)) { 
        throw new ApiError("Invalid admin id", 400);            
    }
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
     throw new ApiError("Admin not found", 404);
    }
    return admin
  }
  async testAdmin(id: string): Promise<IAdmin | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid admin id", 400);
    }

    const data = await Admin.findById(id); 
    if (!data) 
      throw new ApiError("Admin not found", 404);
    
    return data;
  }
}
export const adminService = new AdminService();