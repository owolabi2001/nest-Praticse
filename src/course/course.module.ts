import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { StudentModule } from 'src/student/student.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  // imports: [StudentModule]
  imports:[
    TeachersModule,
    TypeOrmModule.forFeature([Course])
  ],
  exports: [TypeOrmModule,CourseService]
})
export class CourseModule {}
