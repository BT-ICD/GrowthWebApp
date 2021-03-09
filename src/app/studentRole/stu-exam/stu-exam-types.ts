export interface IAnswerOptions {
    questionId:number
    answerOptionId:number,
    htmlText:string
}
export interface IQuestionAndOptions{
    examQuestionId:number,
    questionId:number,
    title:string,
    htmlText:string,
    options:IAnswerOptions[];
}
export interface IExamData{
    examStudentId:number,
    examId:number,
    studentId:number,
    questions:IQuestionAndOptions[]
}
export interface IExamDataResolve{
    examData:IExamData;
    error?:string;
}
//To submit/feedback Answer for a particualr question of an exam
export interface IExamAnswerDTOUpdate{
    examStudentId:number,
    examQuestionId:number,
    answerOptionId:number,
    questionStatus:number
}
