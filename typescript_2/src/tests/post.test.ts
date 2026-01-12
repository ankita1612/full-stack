import request from "supertest";
import app from "../app";
import Post from "../models/posts.model";

describe("Post CRUD API", () => {
  let postId: string;

  it("should create a post", async () => {
    const res = await request(app)
      .post("/api/v1/posts")
      .send({
        title: "Jest Post",
        author: "Ankita",
        description: "Testing post creation",
        published: true,
      });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Jest Post");
    postId = res.body.data._id;
  });

  it("should get all posts", async () => {
    const res = await request(app).get("/api/v1/posts");
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);

  });

  it("should get a single post", async () => {
    const res = await request(app).get(`/api/v1/posts/${postId}`);
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.data._id).toBe(postId);
  });

  it("should update a post", async () => {
    const res = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .send({ title: "Updated Post" ,description :"Testing post creation" ,author :"Ankita" ,published :true });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe("Updated Post");
  });

  it("should delete a post", async () => {
    const res = await request(app).delete(`/api/v1/posts/${postId}`);
    expect(res.status).toBe(201);
  });
});
