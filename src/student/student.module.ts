import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Logging } from './middleware/log.middle';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CourseModule } from 'src/course/course.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Student]),CourseModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService,TypeOrmModule]
})
export class StudentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Logging)
      // .forRoutes({path:'student/*',method: RequestMethod.ALL});
      .forRoutes(StudentController);
  }
}
