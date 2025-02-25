import { useMount } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store";
import Post from "./Post";
import { getPostsAsync } from "./postSlice";
import "./post.css";

const PostList = () => {
  const postList = useAppSelector((state) => state.myPost.entries);
  const appDispatch = useAppDispatch();
  // 挂载时获取数据
  useMount(() => {
    appDispatch(getPostsAsync());
  });

  const renderList = postList.map((post) => {
    return <Post key={post.id} {...post} />;
  });

  return (
    <section className="post-section">
      <h1>There is all new Posts!</h1>
      {renderList}
    </section>
  );
};

export default PostList;
