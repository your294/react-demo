import type { Post } from "./postSlice";
import "./post.css";

const Post = ({ id, title, content }: Post) => {
  return (
    <div className="post-container">
      <div className="post-container__base">
        <h2>title:&nbsp;{title}</h2>
        <h3>ID:&nbsp;{id}</h3>
      </div>
      <div className="post-container__content">
        <span>{content}</span>
      </div>
    </div>
  );
};

export default Post;
