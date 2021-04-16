export interface IMyAssignments {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    status:string,
    allocatedOn:Date,
    isFileSubmitRequired:boolean,
    assignmentAllocationId:number,
    subjectId:number,
    subjectName:string
}
export interface IMyAssignmentsResolve{
    myAssignments:IMyAssignments[],
    error?:any
}
export interface IMyAssignmentResolve{
    myAssignment:IMyAssignments,
    error?:any
}
export interface IAssignmentSubmit{
    assignmentAllocationId:number,
    comments:number,
    file:File
}
export interface IAssignmentLogDTODetail{
    assignmentLogId:number,
    assignmentAllocationId:number,
    status:string,
    comments:string,
    storedAsFilename:string,
    createdBy:string,
    createdOn:Date
}
export interface IAssignmentLogResolve{
    assignmentLogs:IAssignmentLogDTODetail[],
    error?:string
}
