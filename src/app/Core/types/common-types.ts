export interface IDeleteResponse{
    rowsAffected:number;
}
export interface IRecordsAffectedResponse{
    recordsAffected:number;
}
export interface IDataUpdateResponseDTO{
    status:string,
    description :string,
    recordCount :number
}
//To fill id and value of subjets - for dropdown
export interface ISubjectLookup{
    subjectId:number,
    name:string
}
export interface ISubjectLookupResolver{
    subjects:ISubjectLookup[];
    error?:any;
}
//To fill id and code  of batch - for dropdown
export interface IBatchLookup{
    batchId:number,
    code:string
}
export interface IBatchLookupResolver{
    batchList:IBatchLookup[];
    error?:any;
}
export interface IDocumentTypeLookup{
    documentTypeId:number,
    name:string
}
export interface IDocumentTypeLookupResolver{
    documentTypeList:IDocumentTypeLookup[],
    error?:any;
}
//To fill id and value of chapters - for dropdown
export interface IChapterLookup{
    chapterId:number,
    name:string
}

//To fill student list along with batch
export interface IStudentLookup{
    studentId:null,
    name:string,
    batchId:string,
    batchCode:string
}
export interface IStudentLookupResolver{
    studentLookup:IStudentLookup[],
    error?:any
}
export interface IAssignment{
    assignmentId:number,
    queTitle:string,
    queHtml:string,
    status:number,
    allocatedOn:Date
}
export interface IQueTypeLookup{
    queTypeId:number,
    questionType:string
}
export interface IQueTypeResolver{
    queTypeLookup:IQueTypeLookup[],
    error?:any
}
