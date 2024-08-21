import mongoose from "mongoose";
import Post from "./Post";
import connectDB from "./database";

const seedPosts = async () => {
  try {
    await connectDB();

    const posts = [
      {
        title: "Interesting Post 1",
        content: "Content for post 1",
        author: "Author 1",
        order: 1,
      },
      {
        title: "Exciting Post 2",
        content: "Content for post 2",
        author: "Author 2",
        order: 2,
      },
      // Add more posts...
    ];

    await Post.insertMany(posts);
    console.log("Seeding completed.");

    mongoose.connection.close();
  } catch (err) {
    console.error("Seeding error:", (err as Error).message);
    process.exit(1);
  }
};

seedPosts();
