export interface Url{
    
    id : number,
    originalUrl : string,
    shortUrl : string,
    numberOfClicked : number,
    isExpired : boolean,

}


export interface MyUrlsResponse extends Url{
    maxClicked : number,
    expiryDate: string,
}

export interface MyUrls extends MyUrlsResponse{

}

