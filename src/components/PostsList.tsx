import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      order
    }
  }
`;

type Post = {
  id: string;
  title: string;
  content: string;
  order: number;
};

type GetPostsData = {
  posts: Post[];
};

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
