import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../utils/withRouter";
import Hero from "./Hero";
import Pagination from "./Pagination";
import FeedNav from "./FeedNav";

// import Post from "./Post";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // error: "",
      articles: {},
      filteredArticles: [],
      taglist: [],
      data: null,
      likes: 0,
      articlePerPage: 4,
      totalArticles: 0,
      activePage: 1,
      activeTab: "",
    };
  }

  componentDidMount() {
    fetch(`https://conduitapi.onrender.com/api/articles`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          totalArticles: data.articles.length,
          data: {
            articles: data.articles.slice(0, this.state.articlePerPage),
          },
        })
      );
    // .then((data) => console.log(data.articles.length, "abcd"));
  }

  componentDidUpdate(_prevProps, prevState) {
    // console.log(_prevProps, prevState, "aaa");
    if (prevState.activePage !== this.state.activePage) {
      this.fetchArticles();
    }
  }

  fetchArticles = () => {
    const limit = this.state.articlePerPage;
    const offset = (this.state.activePage - 1) * limit;

    fetch(
      `https://conduitapi.onrender.com/api/articles/?offset=${offset}&limit=${limit}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          data: data,
          // error: "",
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch data" });
      });
  };

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
        <section>
          <div>
            <FeedNav activeTab={this.state.activeTab} />
          </div>
        </section>

        <section className="flex">
          <div className="article-box">
            {this.state.data.articles.map((post, i) => {
              if (tagName && !post.article.taglist.includes(tagName)) {
                return <div key={post.slug} />;
              }

              return (
                <>
                  <div className=" padding-50" key={post.article.title}>
                    <h2>{post.article.title}</h2>
                    <p>{post.article.description}</p>
                    <Link to={`/${post.article.slug}`}>Read More</Link>
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
              <Link exact="true" to={`/`}>
                All
              </Link>
            </button>
            {this.state.data.articles.map((post, i) => {
              return (
                <>
                  <div key={post.slug}>
                    {post.article.taglist.map((tag, i) => {
                      return (
                        <button key={i} className="tag">
                          <Link to={`/?tag=${tag}`}>{tag}</Link>
                        </button>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </section>
        {/* <section>
          <div>
            <Post articles={this.state.articles} errors={this.state} />
          </div>
        </section> */}

        <section>
          <div className="page-box ">
            <Pagination
              total={this.state.totalArticles}
              activePage={this.state.activePage}
              onPageChange={(pageNumber) => {
                this.setState(
                  {
                    activePage: pageNumber,
                  },
                  this.fetchArticles
                );
              }}
            />
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Home);

// function Home(props) {
//   return (
//     <main>
//       <Hero />

//       <div>
//         <div>
//           <section>
//             <Post articles={props.articles} />
//             <Pagination />
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }
// export default withRouter(Home);
