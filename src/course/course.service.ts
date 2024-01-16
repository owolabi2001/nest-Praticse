import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentService } from 'src/student/student.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { Course } from './course.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { genericResponse } from 'src/generic.response';
import { Student } from 'src/student/student.entity';

@Injectable()
export class CourseService {

    constructor(
        // private readonly teacherService: TeachersService,
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,

        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ){}


    async addCourse(courseDto:CourseDto){
        const checkCourse = await this.courseRepository.findOneBy({courseCode:courseDto.courseCode});

        if(checkCourse){
            return genericResponse(
                "11",
                `CourseCode ${courseDto.courseCode} already exist`,null,null);
        }
        const course = await this.courseRepository.create(courseDto);
        return genericResponse(
            "00",
            "Course Saved",
            await this.courseRepository.save(course),null
            
        );

    }

    async addStudentsToCourse(matricNumber: string, courseCode: string) {
        const course:Course = await this.courseRepository.findOne({
            relations:{
                students:true
            },where:{
                courseCode: courseCode
            }
        })

        const student:Student = await this
            .studentRepository
            .findOneBy({matricNumber:matricNumber});
        
        const studentsLists:Student[]= course.students; 
        const checkStudent:boolean = course.students.some((s)=>s.id==student.id);
        console.log(checkStudent);
        if(checkStudent){
            return genericResponse("00","")
        }

        course.students = [ student ];
        
        try{
            const saved = await this.courseRepository.save(course);

            if(saved){
                return {
                    course: course,
                    student: student
                }

            }
            return genericResponse(
                "11",
                "Method didn't work, may be student is unavailable");

        }
        catch(error){
            return genericResponse("11",error.msg);
        }
      }





}
