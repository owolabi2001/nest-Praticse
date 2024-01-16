import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentInfo } from './dto/Student.dto';
import { courseCode } from './dto/enrollForCourse.dto';


@Controller('student')
// @RequestMapping()

export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post("addStudent")
  addStudent(@Body() student:StudentInfo){
    console.log("API to add student"); 
    return this.studentService.addStudent(student);
  }

  @Post("addStudents")
  addStudents(@Body() students:StudentInfo[]){
    return this.studentService.addStudents(students);
  }

  @Get("/find/:matricNumber")
  findStudentByMatric(@Param("matricNumber") matricNumber:string){
    return this.studentService.findStudentByMatric(matricNumber);
  }

  @Put("/updateStudent/:matricNumber")
  updateStudent(@Param("matricNumber") matricNumber:string,@Body() studentInfo:StudentInfo){
    return this.studentService.updateStudentDetails(matricNumber,studentInfo);
  }

  @Get("findAll")
  findAllStudent(){
    return this.studentService.findAllStudent();
  }
  
  @Delete("/delete")
  deleteStudent(@Query("matricNumber") matricNumber:string){
    return this.studentService.deleteStudent(matricNumber);
  }

  @Post("/enrollForCourse")
  enrollStudentForCourse(
    @Query("matricNumber") matricNumber:string,  
    @Body() courses:courseCode[]
  ){
    return this.studentService.enrollStudentForCourse(courses,matricNumber)
  }

  @Get("/check/enrolledCourses/:matricNumber")
  checkEnrolledCourse(@Param("matricNumber") matricNubmer:string){
    return this.studentService.checkEnrolledCourses(matricNubmer);

  }

  
}

