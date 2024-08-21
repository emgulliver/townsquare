import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const Post = model("Post", PostSchema);

export default Post;
