import { CourseLecture } from "./course-lecture";

export interface CourseChapter{
    id:number;
    title:string;
    numOfLectures:number;
    duration:string;
    lectures:CourseLecture[];

}

//partial type