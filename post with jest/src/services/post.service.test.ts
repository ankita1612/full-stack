import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostService } from './post.service';
import { Post } from '../models/post.model';

describe('PostService CRUD with MongoDB', () => {
  let mongoServer: MongoMemoryServer;
  const service = new PostService();

  // Start in-memory MongoDB
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = "mongodb://localhost:27017/post_crud1"    
    await mongoose.connect(uri);
  });

 // Clean database after each test
  afterEach(async () => {
    await Post.deleteMany({});
  });

//   // Stop MongoDB
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should create a post', async () => {
    const post = await service.createPost({
      title: 'Test title',
      description: 'Test description',
      author: 'Ankita',
    });

    expect(post._id).toBeDefined();
    expect(post.title).toBe('Test title');
    expect(post.published).toBe(false); // default value check
  });

  it('should get all posts', async () => {
    await service.createPost({
      title: 'Post 1',
      description: 'Desc 1',
      author: 'User 1',
    });

    const posts = await service.getPosts();

    expect(posts.length).toBe(1);
    expect(posts[0].title).toBe('Post 1');
  });

  it('should get post by id', async () => {
    const created = await service.createPost({
      title: 'Find me',
      description: 'Find description',
      author: 'Admin',
    });

    const post = await service.getPostById(created._id.toString());

    expect(post).not.toBeNull();
    expect(post?.title).toBe('Find me');
  });

  it('should update a post', async () => {
    const created = await service.createPost({
      title: 'Old title',
      description: 'Old desc',
      author: 'Admin',
    });

    const updated = await service.updatePost(created._id.toString(), {
      title: 'New title',
      published: true,
    });

    expect(updated?.title).toBe('New title');
    expect(updated?.published).toBe(true);
  });
  it('should delete a post', async () => {
    const created = await service.createPost({
      title: 'Delete me',
      description: 'Delete desc',
      author: 'Admin',
    });

    await service.deletePost(created._id.toString());

    const posts = await service.getPosts();
    expect(posts.length).toBe(0);
  });
});
