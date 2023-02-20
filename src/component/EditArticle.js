import React from "react";
import { withRouter } from "../utils/withRouter";
import "../styles/index.css";
// import { Link } from "react-router-dom";

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
      error: "",
      errors: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    };
  }

  componentDidMount() {
    let slug = this.props.router.params.id;

    fetch(`https://conduitapi.onrender.com/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        let { title, description, body, taglist } = data.article.article;

        this.setState({
          title: title,
          description: description,
          body: body,
          tagList: taglist.join(","),
        });
      })
      .catch((error) => {
        this.setState({ error: "article is not fetch" });
      });
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.error };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let slug = this.props.router.params.id;
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    console.log(tagList, "list");
    fetch(`https://conduitapi.onrender.com/api/articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${this.props.user?.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(",").map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Can not create Article");
        }
        return res.json();
      })
      .then(({ article }) => {
        this.setState({
          title: "",
          description: "",
          body: "",
          tagList: "",
        });
        this.props.router.navigate(`/${this.props.router.params.id}`);
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    // let slug = this.props.router.params.id;

    let { title, description, body, tagList } = this.state;
    return (
      <>
        <section>
          <div className="form-box">
            <form>
              <h3>Update Article</h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                name="body"
                placeholder="Body"
                value={body}
                onChange={this.handleChange}
              />{" "}
              <br />
              <input
                type="text"
                name="tagList"
                placeholder="Tags"
                value={tagList}
                onChange={this.handleChange}
              />
              <br />
              <br />
              <input
                type="submit"
                value="Update Article"
                onClick={this.handleSubmit}
              />
            </form>
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(EditArticle);
