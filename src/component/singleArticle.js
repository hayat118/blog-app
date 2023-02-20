import React from "react";
// import { useParams } from "react-router-dom";
import { withRouter } from "../utils/withRouter";
import { Link } from "react-router-dom";

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: "",
      // articles: "",
      // data: "",
    };
  }

  componentDidMount() {
    // console.log(this.props.router.params, "ab");
    let slug = this.props.router.params.id;
    fetch(`https://conduitapi.onrender.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => this.setState({ slug: data }))
      .then((data) => console.log(data, "data"));
  }

  handleDelete = (slug) => {
    fetch(`https://conduitapi.onrender.com/api/articles/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("Unable to delete");
        }
      })
      .then((data) => {
        this.props.router.navigate("/");
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    let slug = this.props.router.params.id;

    if (!this.state.slug) {
      return <h2>Fetching</h2>;
    }
    console.log(this.state.slug, "slug");
    return (
      <>
        <section>
          <div className="single-box padding-50">
            <h3>Title : {this.state.slug.article.article.title}</h3>
            <small>
              Author:{this.state.slug.article.article.author.username}
            </small>
          </div>
          <div className="padding-50">
            <p>Body:{this.state.slug.article.article.body}</p>
          </div>
          {this.props.user === null ? (
            <div>
              <p>
                <Link to="/signin">Sign In</Link> or
                <Link to="/signup">Sign Up</Link> to add comments on this
                article
              </p>
            </div>
          ) : (
            ""
          )}
        </section>

        {this.props.user ? (
          <section>
            <div>
              <button onClick={() => this.handleDelete(slug)}>
                Delete article
              </button>
              <button>
                <Link to={`/editArticle/${slug}`}>Edit Article</Link>
              </button>
            </div>
            <br />
            <hr />
            <div></div>
          </section>
        ) : (
          ""
        )}
      </>
    );
  }
}
export default withRouter(Single);
