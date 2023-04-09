import { Body, Controller, UploadedFile, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { Post as PostModel } from './post.model';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() postDto: CreatePostDto, @UploadedFile() image): Promise<PostModel> {
    return this.postService.createPost(postDto, image);
  }
}
