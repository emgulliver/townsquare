import React from "react";
import { useQuery, gql } from "@apollo/client";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery<GetPostsData>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // implement drag and drop.
  // change the UI so its list order vertically, same length.
  //  remove the button ui and add a more nox.
  // Add a database first
  // need to use a library like react drag and drop
  // post to the DB, update the order field
  // create a new mutation in the database to post / update the order of the specified ID.

  // make it persist? this wouldnt be a state would it? It would need to be database surely?
  // useRef / useState? for the interim? but you'd immediately post that state

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2}>
        {data?.posts.map((post) => (
          <Item key={post.id}>
            <div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
            {/* Icon for reordering */}
          </Item>
        ))}
      </Stack>
    </Box>
  );
};

export default PostsList;
