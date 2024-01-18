import { IsInt, IsString } from "class-validator";

export class CourseDto{

    @IsInt()
    courseUnit:number;
    @IsString()
    courseTitle:string;
    @IsString()
    courseCode:string;
    
    
}