import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { userDto } from './dto/user.dto';
import { genericResponse } from 'src/generic.response';
import * as bcrypt from "bcrypt"
import { IsEmail } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import { config } from 'process';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private config: ConfigService
    ) { }

    async adduser(user: userDto) {
        console.log("API to add User");
        const check: User = await this.userRepository.findOneBy({
            email: user.email
        });
        if (check) {
            return genericResponse(
                HttpStatus.FORBIDDEN.toString(),
                "user already exist with this email");
        }
        const { email, password } = user;

        const hashedPassword = await this.hashPassword(password);

        console.log(hashedPassword);
        const createdUser = await this.userRepository.create({
            email: email, password: hashedPassword
        })
        const userSave = await this.userRepository.save(createdUser);
        const responseUser = { ...userSave, password: undefined };

        return genericResponse(
            HttpStatus.CREATED.toString(),
            "user created",
            responseUser
        );
    }

    async findUser(email: string) {
        const user: User = await this.userRepository.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return genericResponse(HttpStatus.ACCEPTED.toString(), "user is", user);
        }
        throw new HttpException("User does not exist", HttpStatus.BAD_REQUEST);
    }

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
        const hash = await bcrypt.hash(password, salt);
        console.log(hash);
        return hash;
    }

    async comparePassword(password: string, hash: string): Promise<Boolean> {
        // hash comes from the database 
        const isMatch = await bcrypt.compare(password, hash);
        console.log(`compare password output +++++++++++++++>${isMatch}`);
        return isMatch;
    }

}
