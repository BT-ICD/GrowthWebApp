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
    subjectName:string

}
export interface IAssignmentDTOAdd {
    queTitle:string,
    queHtml:string,
    notes:string,
    subjectId:number
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