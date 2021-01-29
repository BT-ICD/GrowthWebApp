export interface IAssignmentDTOList {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    notes:string
}
export interface IAssignmentDTOEdit {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    notes:string
}
export interface IAssignmentDTODetail {
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    notes:string
}
export interface IAssignmentDTOAdd {
    queTitle:string,
    queHtml:string,
    notes:string
}
export interface IAssignmentListResolver{
    assignmentList:IAssignmentDTOList[],
    error?:any
}
export interface IAssignmentResolver{
    assignment:IAssignmentDTOList,
    error?:any
}