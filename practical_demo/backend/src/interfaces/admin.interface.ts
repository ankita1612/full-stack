export default interface IAdmin {
  title: string;
  email:string;
  description: string;
  author: string;
  published: boolean;
  option_type:string;
  skills:string[];
  tags:string[];
  createdAt:Date;
}


export interface GetAdminsQuery {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}