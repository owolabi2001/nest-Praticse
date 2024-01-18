import { IsEmail, IsInt, IsString } from "class-validator";
import { Student } from "src/student/student.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Course{
    @PrimaryGeneratedColumn("uuid")
    id:string;

    
    @Column()
    courseTitle:string;
    
    
    @Column()
    courseCode: string;

    
    @Column()
    courseUnit:number;

    @ManyToMany(()=> Student,(student)=>student.courses)
    @JoinTable()
    students:Student[]



}