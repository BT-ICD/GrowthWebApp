export interface IQuestionListDTO {
    questionId:number,
    title:string,
    htmlText:string,
    queTypeId:number
}
export interface IQuestionListResolve {
questions:IQuestionListDTO[],
chapterId:number,
subjectId:number,
subjectName:string,
chapterName:string,
error?:any
}
export interface IAnswerOptions{
    htmlText:string,
    plainText:string
}
export interface IQuestionDTOAdd{
    title:string,
    htmlText:string,
    plainText:string,
    chapterId:number,
    queTypeId:number,
    notes:string,
    answerOptions:IAnswerOptions[]
}