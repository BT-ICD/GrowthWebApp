export interface IDeleteResponse{
    rowsAffected:number;
}
export interface IRecordsAffectedResponse{
    recordsAffected:number;
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
