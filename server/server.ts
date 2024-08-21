import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";
import connectDB from "./database"; // Import the connection function
import Post from "./Post"; // Import your Mongoose Post model

connectDB();

type Post = {
  id: string;
  title: string;
  content: string;
  order: number;
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

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

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves posts from the "posts" array defined above.
const resolvers = {
  Query: {
    posts: async () => {
      try {
        return await Post.find();
      } catch (err) {
        console.log(err);
        throw new Error("failed to fetch posts");
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
