import { Injectable } from '@nestjs/common';
import { StudentInfo } from './dto/Student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { genericResponse } from 'src/generic.response';
import { Course } from 'src/course/course.entity';
import { CourseService } from 'src/course/course.service';
import { courseCode } from './dto/enrollForCourse.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) 
    private studentRepository:Repository<Student>,
    @InjectRepository(Course)
    private courseRepository:Repository<Course>,
    private courseService:CourseService
  ){}

  async addStudent(studentInfo: StudentInfo){
    const checkStudent = 
      await this
      .studentRepository
      .findOneBy({matricNumber:studentInfo.matricNumber});
    console.log(checkStudent);
    
    if(checkStudent){
      return genericResponse(
        "11",
        `student with the matric number ${studentInfo.matricNumber} already exist`,
        null,null
      )
    } 
    
    const newStudent = await this.studentRepository.create(studentInfo);

    // return await this.studentRepository.save(newStudent);
    return genericResponse(
      "00",
      "Student Added",
      await this.studentRepository.save(newStudent),null);
  
  }

  addStudents(students: StudentInfo[]) { 
    const studentAdded:StudentInfo[] = []; 
    const existedStudent:StudentInfo[]= [];
    // console.log(students);
    students.forEach((student)=>{
      const generic = this.addStudent(student);
      if(generic)
      studentAdded.push(student);
    })
    return genericResponse(
      "00",
      "Students Added",
      studentAdded,null
    );
  }

  async findAllStudent():Promise<Student[]>{
    console.log("API to find all student");
    return await this.studentRepository.find();
  }

  async findStudentByMatric(matricNumber: string){
    const student = await this.studentRepository.findOneBy({matricNumber:matricNumber})
    return genericResponse(
      "00",
      `Student with the matric numbe: ${matricNumber}`,student,null);
  }


  async updateStudentDetails(matricNumber:string, studentInfo:StudentInfo){
    console.log("API to Update Students");
    const student:Student = await this.studentRepository.findOneBy({matricNumber:matricNumber});
    console.log(student);
    const update = await this.studentRepository.update(student.id,{
      department: studentInfo.department,
      firstName: studentInfo.firstName, 
      lastName: studentInfo.lastName,
    });
    return genericResponse("00","Student Successfully Updated",update,null);
  }


  ///Still not working for some reason, come back and figure it out
  async deleteStudent(matricNumber:string){
    console.log("API to delete student");
    console.log(matricNumber);
    const student:Student= await this.studentRepository.findOneBy({matricNumber});
    console.log(student);

    if(student){
      await this.studentRepository.remove(student);
      return genericResponse("00","Student deleted");
    }

    return genericResponse("11","Student Does not exist");
  }

  // async enrollStudentForCourses(courseList:courseCode[],matricNumber){
  //   console.log("API TO ENROLL STUDENT FOR COURSES");
  //   const student:Student = await this.studentRepository.findOne({
  //     relations: {
  //       courses:true
  //     }, where:{
  //       matricNumber:matricNumber
  //     }
  //   });

  //   console.log(student.courses);
  //   courseList.forEach(async(c1)=>{
  //     const course:Course = await this.courseRepository.findOneBy({
  //       courseCode: c1.courseCode
  //     })
  //     console.log("====+++++==>course log",course);
  //     const checkCourse = student.courses.filter((c)=>c.id=course.id);
  //     console.log("the checkcourse variable",checkCourse);
  //     if(checkCourse.length==0){
  //       student.courses = [...student.courses,course];
  //       console.log("recent student.course",student.courses);
  //     }else{
  //       console.log("this is the course check ++++++>",checkCourse);
  //     }
  //   });
    
  //   await this.studentRepository.save(student);
  //   return{
  //     student
  //   }
  // }


  async enrollStudentForCourseIndividual(student:Student, courseCode:string){

    const course:Course = await this.courseRepository.findOne({where:{
      courseCode:courseCode
    }})
    student.courses = [...student.courses,course];
    return this.studentRepository.save(student);
  }

  async enrollStudentForCourse(courseList:courseCode[],matricNubmer){
    const student:Student = await this.studentRepository.findOne({
      relations:{
        courses:true
      },where:{
        matricNumber:matricNubmer
      }
    });
    courseList.forEach(async(c)=>{
      this.enrollStudentForCourseIndividual(student,c.courseCode);

    });
  }
  
  async checkEnrolledCourses(matricNumber:string){

    const student = await this.studentRepository.findOne({
      relations: {
        courses: true

      }, where: {
        matricNumber:matricNumber
      }
    });
    const coursesEnrolled= student.courses;
    return {
      coursesEnrolled
    };
  }
}
