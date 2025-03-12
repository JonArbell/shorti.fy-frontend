import { Url } from "../models/url.model";

export interface LogInResponse{

    jwtToken : string,
    firstName : string,
    lastName : string,
    email : string,
    username: string,
    urlList : Url[]
  
}