export interface IDashboardSessionSummary {
    sessionType:string,
    numberOfSessions:number
}
export interface IDashboardDTOStudent{
    sessionSummary:IDashboardSessionSummary[]
}
export interface IDashboardDTOStudentResolve{
    dashboardDTOStudent:IDashboardDTOStudent,
    error:any;
}
