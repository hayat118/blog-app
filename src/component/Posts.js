import React from "react";
// import Loader from './Loader';
import Post from "./Post";

function Posts(props) {
  let { articles, error } = props;
  console.log(articles, "art");
  if (!articles) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (articles.length < 1) {
    return <h2>No Articles Found</h2>;
  }

  return (
    <>
      {articles.map((article, i) => {
        return <Post articles={article} key={i} {...article} />;
      })}
    </>
  );
}

export default Posts;
