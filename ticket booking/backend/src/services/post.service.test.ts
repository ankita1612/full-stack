import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostService } from './post.service';
import { Types } from "mongoose";

describe('PostService CRUD with MongoDB', () => {
  let mongoServer: MongoMemoryServer;
  const postServices = new PostService();
  let post_created_id: Types.ObjectId | null = null
  // Start in-memory MongoDB
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = "mongodb://localhost:27017/post_crud1"    
    await mongoose.connect(uri);
  });

 // Clean database after each test
  afterEach(async () => {
   // await Post.deleteMany({});
  });

//   // Stop MongoDB
  afterAll(async () => {
    // await mongoose.disconnect();
    // await mongoServer.stop();
  });

  it('should create a post', async () => {
    const post = await postServices.createPost({
      title: 'Test title',
      description: 'Test description',
      author: 'Ankita',      
      published: false,
    });
    expect(post?._id).toBeDefined();
    post_created_id = post!._id;
    expect(post?.title).toBe('Test title');
    expect(post?.published).toBe(false); // default value check
  });

  it('should get all posts', async () => {
    // await postServices.createPost({
    //   title: 'Post 1',
    //   description: 'Desc 1',
    //   author: 'User 1',
    //   published: false,
    // });

    const posts = await postServices.getPosts();   
    expect(posts?.length ?? 0).toBeGreaterThan(1)
    expect(posts?.[0]?.title).toBe('Test title');
  });

  it('should get post by id', async () => {
    // const created = await postServices.createPost({
    //   title: 'Find me',
    //   description: 'Find description',
    //   author: 'Admin',
    //   published: false,
    // });
    expect(post_created_id).not.toBeNull();
    const post = await postServices.getPost(post_created_id!.toString());
    expect(post).not.toBeNull();

    if (!post) {
      throw new Error('Post not found');
    }
    expect(post.title).toBe('Test title');
  });

  it('should update a post', async () => {
    // const created = await postServices.createPost({
    //   title: 'Old title',
    //   description: 'Old desc',
    //   author: 'Admin',
    //   published: false,
    // });
      expect(post_created_id).not.toBeNull();
      const updated = await postServices.updatePost(post_created_id!.toString(),
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
    // const created = await postServices.createPost({
    //   title: 'Delete me',
    //   description: 'Delete desc',
    //   author: 'Admin',
    //   published: true,
    // });

      expect(post_created_id).not.toBeNull();

      await postServices.deletePost(post_created_id!.toString());

      const posts = await postServices.getPosts();
      expect(posts?.length).toBe(0);
  });
});
