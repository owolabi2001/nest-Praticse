import { IsEmail, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    
    @PrimaryGeneratedColumn("uuid")
    id:string
    
    @Column()
    @IsEmail()
    email:string

    @Column()
    @IsString()
    password:string
}