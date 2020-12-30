export interface IDeleteResponse{
    rowsAffected:number;
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
//To fill id and value of chapters - for dropdown
export interface IChapterLookup{
    chapterId:number,
    name:string
}
