export interface IChapterDTOList{
    chapterId:number,
    chapterSrNo:number,
    name:string,
    notes:string
}
export interface IChapterDTODetail{
    chapterId:number,
    chapterSrNo:number,
    name:string,
    subjectId:number,
    subjectName:string,
    notes:string
}
export interface IChapterDTOAdd{
    chapterSrNo:number,
    name:string,
    subjectId:number,
    notes:string  
}
export interface IChapterListResolver{
    chapters:IChapterDTOList[],
    subjectId:number,
    subjectName:string,
    error?:any
}
export interface IChapterResolver{
    chapters:IChapterDTODetail,
    error?:any
}