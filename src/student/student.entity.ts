import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentInfo } from "./dto/Student.dto";
import { Course } from "src/course/course.entity";


@Entity()
export class Student{

    @PrimaryGeneratedColumn("uuid")
    id:string;
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column()
    matricNumber: string;
    @Column()
    department:string
    @Column({default:true})
    isActive:boolean;

    @ManyToMany(()=> Course, (course)=> course.students)
    courses:Course[]

}