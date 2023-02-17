import React from "react";
import "../styles/index.css";
import { withRouter } from "../utils/withRouter";

class Newpost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
      errors: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    };
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.errors };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, body, tagList } = this.state;

    fetch(`https://conduitapi.onrender.com/api/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `  ${this.props.user.token}`,
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
          throw new Error("Can not create new Article!");
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article);
        // this.props.updateUser(article);
        this.setState({
          title: "",
          description: "",
          tagList: "",
          body: "",
        });
        this.props.router.navigate("/");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    const { title, description, body, tagList } = this.state;

    return (
      <>
        <div className="form-box">
          <form action="">
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Add Titles"
            />
            <br />
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
              placeholder="What is this article about"
              value={description}
            />
            <br />
            <br />
            <textarea
              onChange={this.handleChange}
              name="body"
              id=""
              cols="50"
              rows="10"
              value={body}
            ></textarea>
            <br />
            <input
              onChange={this.handleChange}
              type="text"
              name="tagList"
              placeholder="Tags"
              value={tagList}
            />
            <br />
            <br />
            <input
              type="submit"
              value="Publish Article"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </>
    );
  }
}
export default withRouter(Newpost);
