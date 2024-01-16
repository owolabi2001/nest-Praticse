import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Student } from './student/student.entity';
import { Course } from './course/course.entity';
@Module({


  imports: [
    StudentModule,
    CourseModule, 
    TeachersModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type:"postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",  
      password: "password",   
      database: "studentDB",
      // entities: [Student,Course],
      autoLoadEntities: true
    })]
})
export class AppModule {
  constructor(private configService: ConfigService){}
  

}
