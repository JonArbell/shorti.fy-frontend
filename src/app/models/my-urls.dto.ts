export interface Url{
    
    id : number,
    originalUrl : string,
    shortUrl : string,
    numberOfClicked : number,
    expired : boolean,

}


export interface MyUrlsResponse extends Url{
    maxClicked : number,
    expiryDate: string,
}

export interface MyUrlsRequest extends MyUrlsResponse{
    originalUrl : string
}



export interface MyUrls extends MyUrlsResponse{

}

