import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class CourseDto{

    @IsInt()
    @Min(0)
    @Max(10)
    courseUnit:number;
    @IsString()
    @Length(10,30)
    courseTitle:string;
    @IsString()
    courseCode:string;
    
    
}