import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentInfo } from './dto/Student.dto';
import { courseCode } from './dto/enrollForCourse.dto';
import { genericResponse } from 'src/generic.response';
import { ValidationPipe1 } from './pipes/validation.pipe';
import { ZodValidationPipe } from './dto/Index';
import { studentValidationSchema } from './dto/validationPipe/validation.schema';
import { userDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth/guards';
import { Public } from 'src/auth/custom decoretors';


@Public()
@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly userService: UserService
  ) { }

  // @UseGuards(AuthGuard)
  @Post("addStudent")
  @UsePipes(new ZodValidationPipe(studentValidationSchema))
  addStudent(@Body() student: StudentInfo) {
    console.log("API to add student");
    // return this.studentService.addStudent(student);
    return this.studentService.addStudentUsingQueryRunner(student);
  }

  
  @Post("user/add")
  addUser(@Body(new ValidationPipe()) user: userDto) {
    return this.userService.adduser(user);

  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get("findUser/:email")
  findUser(@Param("email") email: string) {
    console.log("API to get user");
    return this.userService.findUser(email);
  }

  @UseGuards(AuthGuard)
  @Post("addStudents")
  addStudents(@Body() students: StudentInfo[]) {
    return this.studentService.addStudents(students);
  }

  @Get("/find/:matricNumber")
  findStudentByMatric(@Param("matricNumber") matricNumber: string) {
    return this.studentService.findStudentByMatric(matricNumber);
  }

  @Put("/updateStudent/:matricNumber")
  updateStudent(@Param("matricNumber") matricNumber: string, @Body() studentInfo: StudentInfo) {
    return this.studentService.updateStudentDetails(matricNumber, studentInfo);
  }

  @Get("findAll")
  findAllStudent() {
    return this.studentService.findAllStudent();
  }

  @Public()
  @Get("findStudent/:matricNumber")
  findStudentByMatricNumber(@Param("matricNumber") matricNumber:string){
    return this.studentService.findStudentUsingQueryBuilder(matricNumber);

  }

  @Delete("/delete")
  deleteStudent(@Query("matricNumber") matricNumber: string) {
    return this.studentService.deleteStudent(matricNumber);
  }

  @Post("/enrollForCourse")
  enrollStudentForCourse(
    @Query("matricNumber") matricNumber: string,
    @Body() courses: courseCode[]
  ) {
    return this.studentService.enrollStudentForCourse(courses, matricNumber)
  }

  @Get("/check/enrolledCourses/:matricNumber")
  checkEnrolledCourse(@Param("matricNumber") matricNubmer: string) {
    return this.studentService.checkEnrolledCourses(matricNubmer);

  }
  @Get("/findMe")
  async findMe() {
    throw new HttpException(genericResponse(
      HttpStatus.FORBIDDEN.toString(),
      "This is the forbidden error message"), HttpStatus.FORBIDDEN);
  }


  @Post("/pipe/:id")
  async pipeTryOut(@Param("id", new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: number) {
    console.log("API for PIPe Validation");
    return {

      message: `nice one you are calling a ${id} and validating with pipe`
    }

  }

  @Post("/pipe1/:id")
  async pipeTryOut1(@Param("id", new ValidationPipe1()) id: number) {
    console.log("API for PIPe Validation");
    return {

      message: `nice one you are calling a ${id} and validating with pipe`
    }

  }

}

