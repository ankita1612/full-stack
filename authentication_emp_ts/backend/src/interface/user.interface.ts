export default interface IUser {
  name: string;
  email:string,
  password: string,
  DOB ?: Date,
  status: Status,
  profile_image ?: string;
}
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export interface ILoginResponse {
  //user: Omit<IUser, "password">;
  user: IUser;
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}