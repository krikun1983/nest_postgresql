import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly filesService: FilesService
  ) {}

  async createPost(postDto: CreatePostDto, image: any): Promise<Post> {
    const fileName = await this.filesService.createFile(image);
    return await this.postRepository.create({ ...postDto, image: fileName });
  }
}
