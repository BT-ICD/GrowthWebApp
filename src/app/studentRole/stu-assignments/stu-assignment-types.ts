export interface IMyAssignments {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    status:number,
    allocatedOn:Date
}
export interface IMyAssignmentsResolve{
    myAssignments:IMyAssignments[],
    error?:any
}
