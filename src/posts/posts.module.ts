import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '../users/user.models';
import { Post } from './post.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([User, Post]), FilesModule],
})
export class PostsModule {}
