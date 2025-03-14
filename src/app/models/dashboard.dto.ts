export interface DashboardResponse{
    overallTotalUrlLinks : number,
    totalActiveUrlLinks : number
    totalExpiredUrlLinks : number,
    mostClickedUrl : string
}

export interface Dashboard extends DashboardResponse{

}