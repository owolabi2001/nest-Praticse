import { IsEmail, IsString } from "class-validator";

export class signIn{
    @IsEmail()
    email:string

    @IsString()
    password:string
}
