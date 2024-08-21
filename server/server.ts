import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import connectDB from "./database.js"; 
import seedPosts from "./seeder.js";
import Post from "./Post.js"; 

// Define the GraphQL schema
const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    order: Int!
  }

  type Query {
    posts: [Post]
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    posts: async () => {
      try {
        return await Post.find(); 
      } catch (err) {
        console.log("Error fetching posts:", err);
        throw new Error("Failed to fetch posts");
      }
    },
  },
};

// Start the server and run the seeder
const startServer = async () => {
  try {
    await connectDB();
    await seedPosts(); 

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });

    console.log(`🚀 Server ready at: ${url}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer(); // Execute the function to start the server and seed the database
