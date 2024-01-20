import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards';

@Module({
  providers: [AuthService,{
    provide: "APP_GUARD", // this helps nest js secure all our api routes
    useClass: AuthGuard
  }],
  controllers: [AuthController],
  imports: [JwtModule.register({
    global: true,
    secret: "SECRET",
    signOptions: { expiresIn: '60s' },
  })]
}) 
export class AuthModule {

  
 }
