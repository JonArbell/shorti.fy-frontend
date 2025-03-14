import { Url } from "./my-urls.dto";

export interface LoginRequestDTO {
    email: string;
    password: string;
}
  

export interface LogInResponse{

    jwtToken : string,
    firstName : string,
    lastName : string,
    email : string,
    username: string,
    urlList : Url[]
  
}