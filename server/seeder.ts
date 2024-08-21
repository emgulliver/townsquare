import Post from "./Post.js";
import connectDB from "./database.js";

const getRandomElement = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const seedPosts = async () => {
  try {
    await connectDB();
    const titles = [
      "Amazing",
      "Incredible",
      "Unbelievable",
      "Exciting",
      "Mysterious",
      "Fascinating",
      "Remarkable",
      "Astounding",
      "Intriguing",
      "Spectacular",
      "Captivating",
      "Enchanting",
      "Breathtaking",
      "Marvelous",
      "Thrilling",
    ];

    const contents = [
      "explores the wonders of the universe",
      "dives into the depths of the ocean",
      "reveals the secrets of the ancient world",
      "uncovers hidden mysteries",
      "delves into the complexities of the human mind",
      "analyzes groundbreaking discoveries",
      "challenges conventional wisdom",
      "offers a fresh perspective",
      "dissects complex issues",
      "brings light to the unknown",
      "narrates an extraordinary journey",
      "shares insights from history",
      "tells a captivating story",
      "portrays a remarkable event",
    ];

    const authors = [
      "Alice",
      "Bob",
      "Charlie",
      "Diana",
      "Eve",
      "Frank",
      "Grace",
      "Hank",
      "Ivy",
      "Jack",
      "Kate",
      "Leo",
      "Mia",
      "Nina",
      "Oscar",
    ];

    const posts = [];
    for (let i = 1; i <= 300; i++) {
      posts.push({
        title: `${getRandomElement(titles)} Post ${i}`,
        content: `This post ${getRandomElement(contents)}.`,
        author: `${getRandomElement(authors)}`,
        order: i,
      });
    }

    await Post.deleteMany({});
    await Post.insertMany(posts);
    console.log("Seeding completed.");
  } catch (err) {
    console.error("Seeding error:", (err as Error).message);
    process.exit(1);
  }
};

export default seedPosts;
