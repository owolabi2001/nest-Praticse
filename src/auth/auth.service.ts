import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { genericResponse } from 'src/generic.response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService:JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user: User = await this.userRepo.findOne({
            where: {
                email: email
            }
        });
        if(!user){
            return genericResponse(
                HttpStatus.UNAUTHORIZED.toString(),
                "User not found");
        }
        
        console.log("this is the try block executing");
        const passwordCheck = await this.userService.comparePassword(pass, user.password);
        console.log("was able to compare password");
        if (passwordCheck) {
            console.log("if statements is executing");
            const { password, ...result } = user;
            // TODO: Generate a JWT and return it here
            console.log(result);
            const payload = {
                "sub": user.id,
                "username": user.email
            }
            console.log(`Payload-------------------->${payload}`);
            // instead of the user object
            return {
                access_token: await this.jwtService.signAsync(payload),
                msg: `Welcome, ${email}`
            };
        }
        return genericResponse(HttpStatus.UNAUTHORIZED.toString(),"credientals not correct");


    }




}
