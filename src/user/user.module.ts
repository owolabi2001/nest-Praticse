import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Global()
@Module({

  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService,TypeOrmModule]
})
export class UserModule {}
