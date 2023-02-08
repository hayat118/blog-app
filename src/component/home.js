import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "../utils/withRouter";
import Hero from "./hero";

// import { FaThumbsUp } from "react-icons/fa";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      filteredArticles: [],
      taglist: [],
      data: null,
      likes: 0,
      dispaly: false,
      // tag: "",
    };
  }

  componentDidMount() {
    fetch(`https://conduitapi.onrender.com/api/articles`)
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
    // .then((data) => console.log(data));
  }

  // handleGlobal = () => {
  //   this.setState({
  //     display: false,
  //   });
  // };

  handleLikes = (e) => {
    e.preventDefault();
    this.setState({
      likes: this.state.likes + 1,
    });
  };

  render() {
    const tagName = new URLSearchParams(this.props.router.location.search).get(
      "tag"
    );

    if (!this.state.data) {
      return <h2>Loading</h2>;
    }

    return (
      <>
        <Hero />

        <section className="flex">
          <div className="article-box">
            <NavLink
              className="feed"
              to="/"
              onClick={this.handleGlobal}
              exact="true"
            >
              Global Feed
            </NavLink>

            {this.state.data.articles.map((post, i) => {
              if (tagName && !post.article.taglist.includes(tagName)) {
                return <div key={i} />;
              }

              return (
                <>
                  <div className=" padding-50" key={post.article.title}>
                    <h2>{post.article.title}</h2>
                    <p>{post.article.description}</p>
                    <NavLink to={`/${post.article.slug}`}>Read More</NavLink>
                    <h2>{this.state.likes}</h2>

                    <button onClick={(e) => this.handleLikes(e)}>Likes</button>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
          <div className="tags-container">
            <h2>Popular Tags</h2>
            <button className="tag">
              <NavLink to={`/`}>All</NavLink>
            </button>
            {this.state.data.articles.map((post, i) => {
              return (
                <>
                  {post.article.taglist.map((tag, i) => {
                    return (
                      <button key={i} className="tag">
                        <NavLink to={`/?tag=${tag}`}>{tag}</NavLink>
                      </button>
                    );
                  })}
                </>
              );
            })}
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Home);
