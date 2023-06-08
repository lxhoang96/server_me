import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupDocument, GroupDocumentSchema } from './schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GroupDocument.name, schema: GroupDocumentSchema, collection: 'group', }]),

  ],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
