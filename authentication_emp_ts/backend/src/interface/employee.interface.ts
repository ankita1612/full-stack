export default interface IEmployee {
  title: string;  
  single_image?:string | null;
  multi_image?:string[];
  DOB:Date;
}

