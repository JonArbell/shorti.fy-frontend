import { Visitor } from "./visitor.dto"

export interface MyUrlResponse{
    id : number,
    originalUrl : string,
    shortUrl : string,
    expired : boolean,
    expiryDate: string,
    numberOfClicked : number,
    maxClicked : number,
    visitors : Visitor[]
}



