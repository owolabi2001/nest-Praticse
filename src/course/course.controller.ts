import { Body, Controller, Post, Query, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { StudentService } from 'src/student/student.service';
import { CourseDto } from './dto/course.dto';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService
    ) {}

    @Post("addCourse")
    addCourse(@Body(new ValidationPipe()) courseDto:CourseDto){
      return this.courseService.addCourse(courseDto);
    }

    @Post("/addStudent")
    addStudentToCourse(
      @Query("matricNumber") matricNumber:string,
      @Query("courseCode") courseCode:string){

        // return this.courseService.addStudentToCourse(matricNumber,courseCode);

    }
}
