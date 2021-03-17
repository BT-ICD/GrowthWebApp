export interface IExamDTOList {
    examId:number,
    subjectId:number,
    subjectName:string,
    totalQuestions:number
}
export interface IExamDTOAdd {
   
    subjectId:number,
    totalQuestions:number,
    notes:string,
    questionsIds:string
}
