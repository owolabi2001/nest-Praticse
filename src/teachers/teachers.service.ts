import { Injectable } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class TeachersService {
    constructor(private studentService: StudentService){}

    addTeachers(){
        return null
    }
}
