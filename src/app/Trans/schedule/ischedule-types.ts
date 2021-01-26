export interface IScheduleList{
    scheduleId:number,
    batchId:number,
    batch:string,
    subjectId:number,
    subject:string,
    lectureFrom:Date,
    lectureTo:Date
}
export interface IScheduleListResolver{
    scheduleList:IScheduleList[],
    error?:any
}
export interface IScheduleAdd{
    batchId:number,
    subjectId:number,
    lectureFrom:Date,
    lectureTo:Date,
    sessionContent:string,
    notes:string
}
export interface IScheduleEdit{
    scheduleId:number,
    batchId:number,
    subjectId:number,
    lectureFrom:Date,
    lectureTo:Date,
    sessionContent:string,
    notes:string
}
export interface IScheduleDetail{
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
export interface IScheduleResolver{
    schedule:IScheduleDetail,
    error?:any
}
//To get as well as submit attendance details for particular schedule
export interface IScheduleAddendanceDTOList{
    scheduleId:number,
    studentId:number,
    name:string,
    status:boolean
}
export interface IAttendanceDTOAdd{
    studentId:number,
    status:boolean
}
export interface IAttendanceDTOSubmit{
    scheduleId:number,
    students:IAttendanceDTOAdd[]
}