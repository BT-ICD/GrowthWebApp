export interface IAssignmentDocumentDTOList {
    assignmentDocumentId:number,
    assignmentId:number,
    queTitle:string,
    subjectId:number,
    subjectName :string,
    documentTypeId:number,
    documentTypeName :string,
    actualFileName :string,
    storeAsFileName :string,
    notes:string
}
export interface IAssignmentDocumentDTODetail{
    assignmentDocumentId:number,
    assignmentId:number,
    queTitle:string,
    subjectId:number,
    subjectName :string,
    documentTypeId:number,
    documentTypeName :string,
    actualFileName :string,
    storeAsFileName :string,
    notes:string
}
export interface IAssignmentDocumentListResolve{
    assignmentDocList:IAssignmentDocumentDTOList[],
    assignmentId:number,
    queTitle:string,
    subjectName :string,
    error?:any
}
export interface IAssignmentDocumentResolve{
    assignmentDoc:IAssignmentDocumentDTODetail,
    error?:any
}
export interface IAssignmentDocAdd{
    assignmentId:number,
    documentTypeId:number,
    notes:string,
    file:File
}