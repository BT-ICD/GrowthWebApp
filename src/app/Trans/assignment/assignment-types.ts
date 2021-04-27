export interface IAssignmentDTOList {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    notes:string,
    subjectId:number,
    subjectName:string
}
export interface IAssignmentDTOEdit {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    notes:string,
    subjectId:number

}
export interface IAssignmentDTODetail {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    notes:string,
    subjectId:number,
    subjectName:string,
    isFileSubmitRequired:boolean

}
export interface IAssignmentDTOAdd {
    queTitle:string,
    queHtml:string,
    notes:string,
    subjectId:number,
    isFileSubmitRequired:boolean
}
export interface IAssignmentListResolver{
    assignmentList:IAssignmentDTOList[],
    error?:any
}
export interface IAssignmentResolver{
    assignment:IAssignmentDTOList,
    error?:any
}
export interface IAssignmentAllocationDTOAdd{
    batchId:number;
    assignmentId:number;
    studentIds:string;
}
export interface IAssignmentAllocationStudents{
    batchId:number;
    studentIds:string;
}
export interface IStatusSummaries{
    status:number,
    statusDesc:string,
    numberofStudents:number
}
export interface IAssignmentReviewDTOList{
    assignmentDTODetail:IAssignmentDTODetail,
    statusSummaries:IStatusSummaries[]
}
export interface IAssignmentReviewResolve{
    assignmentReviewDTOList:IAssignmentReviewDTOList,
    error?:string
}
export interface IAssignmentLogDTOReviewListStudent{
    assignmentId:number,
    status:number,
    statusDesc:string,
    studentName:string,
    studentId:number,
    assignmentAllocationId:number,
    submittedOn:Date
    assignmentLogId:number,
    comments:string,
    storedAsFilename:string

}

export interface IAssignmenReviewListLogResolve{
    assignmentListStudent:IAssignmentLogDTOReviewListStudent[],
    error?:string
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
export interface IassignmentLogDTOAdd{
    assignmentAllocationId:number,
    comments:string,
    status:number,
    actualFileName:string; //TODO: No use of this property for a now. In future allow faculty to upload reference file for student review as a hint
}