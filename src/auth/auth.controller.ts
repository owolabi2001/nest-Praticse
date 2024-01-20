import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signIn } from './dto';
import { Public } from './custom decoretors';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Public()
    @Post("login")
    signIn(@Body( new ValidationPipe()) signInDto:signIn){
        const {email,password} = signInDto;
        return this.authService.signIn(email,password);

    }
}
