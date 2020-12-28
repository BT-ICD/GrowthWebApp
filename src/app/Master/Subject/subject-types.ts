export interface ISubjectList{
    subjectId:number;
    name:string;
    prerequisite:string;
    notes:string;
   
}

export interface ISubjectDetail{
    subjectId:number,
    name:string,
    prerequisite:string,
    notes:string
    
}
export interface ISubjectAdd{
    name:string,
    prerequisite:string,
    notes:string
}
export interface SubjectListResolver{
    subjects:ISubjectList[],
    error?:string
}
export interface ISubjectResolver{
    subject:ISubjectDetail,
    error?:string
}
export interface DeleteResponse{
    rowsAffected:number;
}