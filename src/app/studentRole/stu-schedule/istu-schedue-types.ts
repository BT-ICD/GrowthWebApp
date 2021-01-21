export interface IScheduleDTOStudent{
    scheduleId:number,
    batchId:number,
    batch:string,
    subjectId:number,
    subject:string,
    lectureFrom:Date,
    lectureTo:Date,
    sessionContent:string,
    notes:string
}
export interface IScheduleDTOStudentListResolver{
    scheduleList:IScheduleDTOStudent[],
    error?:any
}