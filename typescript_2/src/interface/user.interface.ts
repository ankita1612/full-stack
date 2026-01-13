export default interface IUser {
  name: string;
  email:string,
  password: string,
  DOB: Date,
  status: boolean,
  profile_image :string
}

export interface ILoginResponse {
  //user: Omit<IUser, "password">;
  user: IUser;
  token: string;
}