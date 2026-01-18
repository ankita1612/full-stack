import { PostService } from './post.service';
import { Post } from '../models/post.model';

jest.mock('../models/post.model', () => ({
  Post: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe('+++++++PostService CRUD+++++++', () => {
  const service = new PostService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create post', async () => {
    const payload = {
      title: 'Test',
      description: 'Desc',
      author: 'Admin',
      published: false,
    };

    (Post.create as jest.Mock).mockResolvedValue(payload);

    const result = await service.createPost(payload);

    expect(Post.create).toHaveBeenCalledWith(payload);
    expect(result).toEqual(payload);
  });

  it('should get all posts', async () => {
    const posts = [{ title: 'Post 1' }];
    (Post.find as jest.Mock).mockResolvedValue(posts);

    const result = await service.getPosts();

    expect(result).toEqual(posts);
  });

  it('should get post by id', async () => {
    const post = { title: 'Post' };
    (Post.findById as jest.Mock).mockResolvedValue(post);

    const result = await service.getPostById('123');

    expect(Post.findById).toHaveBeenCalledWith('123');
    expect(result).toEqual(post);
  });

  it('should update post', async () => {
    const updated = { title: 'Updated' };
    (Post.findByIdAndUpdate as jest.Mock).mockResolvedValue(updated);

    const result = await service.updatePost('123', { title: 'Updated' });

    expect(result).toEqual(updated);
  });

  it('should delete post', async () => {
    const deleted = { title: 'Deleted' };
    (Post.findByIdAndDelete as jest.Mock).mockResolvedValue(deleted);

    const result = await service.deletePost('123');

    expect(result).toEqual(deleted);
  });
});
