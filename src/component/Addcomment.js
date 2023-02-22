import React from "react";
import "../styles/index.css";
import Comments from "./Comments";

class Addcomment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: [],
      body: "",
      error: "",
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // console.log(this.props);

    let slug = this.props.slug;
    // console.log(slug, "sl");

    fetch(`https://conduitapi.onrender.com/api/articles/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: this.state.body,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("Unable to fetch comment");
        }
        return res.json();
      })
      .then((data) => {
        this.fetchComment();
        this.setState({
          body: "",
        });
      })
      .catch((error) => {
        this.setState({ errors: error });
      });
  };

  fetchComment = () => {
    // let slug = this.props.router.params.id;
    let slug = this.props.slug;

    console.log(slug, "sss");

    fetch(`https://conduitapi.onrender.com/api/articles/${slug}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject("unble comments");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.comments);
        this.setState({
          comment: data.comments,
        });
      })
      .catch((error) => {
        this.setState({
          error: "unble to fetch comment",
        });
      });
  };

  componentDidMount() {
    this.fetchComment();
  }

  handleDelete = (id) => {
    console.log(id, "delete");
    let slug = this.props.slug;
    fetch(
      `https://conduitapi.onrender.com/api/articles/${slug}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: ` ${this.props.user.token}`,
        },
      }
    ).then(this.fetchComment);
  };

  render() {
    return (
      <>
        <div className="form-box">
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="area"
              onChange={this.handleChange}
              name="body"
              id=""
              cols="40"
              rows="5"
              placeholder="Write Comments..."
              value={this.state.body}
            ></textarea>
            <br />
            <br />
            <input className="btn" type="submit" value="comment" />
          </form>
          <br />

          <div>
            {this.state.comment.map((c, i) => {
              return (
                <Comments
                  user={this.props.user}
                  key={i}
                  comment={c}
                  handleDelete={() => this.handleDelete(c.id)}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
export default Addcomment;
