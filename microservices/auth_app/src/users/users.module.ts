import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [

    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema, collection: 'users', }]),
    SessionModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
