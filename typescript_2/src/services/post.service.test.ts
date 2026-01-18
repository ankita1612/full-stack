import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { postService } from './post.service';
import { Types } from "mongoose";

describe('PostService CRUD with MongoDB', () => {
  let mongoServer: MongoMemoryServer;
  let post_created_id: Types.ObjectId | null = null

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = "mongodb://localhost:27017/post_crud2"    
    await mongoose.connect(uri);
  });

  afterEach(async () => {
   // await Post.deleteMany({});
  });

  afterAll(async () => {
    // await mongoose.disconnect();
    // await mongoServer.stop();
  });

  it('should create a post', async () => {
    const post = await postService.createPost({
      title: 'Test title',
      email:'ankita@yopmail.com',
      description: 'Test description',
      author: 'Ankita',      
      published: false,
      skills:['php','html']
    });
    expect(post?._id).toBeDefined();
    post_created_id = post!._id;
    expect(post?.title).toBe('Test title');
    expect(post?.published).toBe(false); // default value check
  });

  it('should get all posts', async () => {
    // await postService.createPost({
    //   title: 'Post 1',
    //   description: 'Desc 1',
    //   author: 'User 1',
    //   published: false,
    // });

    const posts = await postService.getPosts();   
    expect(posts?.length ?? 0).toBeGreaterThan(1)
    expect(posts?.[0]?.title).toBe('Test title');
  });

  it('should get post by id', async () => {
    // const created = await postService.createPost({
    //   title: 'Find me',
    //   description: 'Find description',
    //   author: 'Admin',
    //   published: false,
    // });
    expect(post_created_id).not.toBeNull();
    const post = await postService.getPost(post_created_id!.toString());
    expect(post).not.toBeNull();

    if (!post) {
      throw new Error('Post not found');
    }
    expect(post.title).toBe('Test title');
  });

  it('should update a post', async () => {
    // const created = await postService.createPost({
    //   title: 'Old title',
    //   description: 'Old desc',
    //   author: 'Admin',
    //   published: false,
    // });
      expect(post_created_id).not.toBeNull();
      const updated = await postService.updatePost(post_created_id!.toString(),
        {
          title: 'New title',
          published: true,
        }
      );

      expect(updated).not.toBeNull();

      if (!updated) {
        throw new Error('Post was not updated');
      }

      expect(updated.title).toBe('New title');
      expect(updated.published).toBe(true);
  });
  it('should delete a post', async () => {
    // const created = await postService.createPost({
    //   title: 'Delete me',
    //   description: 'Delete desc',
    //   author: 'Admin',
    //   published: true,
    // });

      expect(post_created_id).not.toBeNull();

      await postService.deletePost(post_created_id!.toString());

     // const posts = await postService.getPosts();
     // expect(posts?.length).toBe(0);
  });
});
