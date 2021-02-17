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
export interface IMyAssign {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    status:number,
    allocatedOn:Date
}
export interface IMyAssignResolve{
    assignments:IMyAssign[],
    error?:any
}