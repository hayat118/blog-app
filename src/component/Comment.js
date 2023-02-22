import React from "react";

import Comments from "../component/Comments";
// import Loader from './loader';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchComment();
  }

  handelDelete = (id) => {
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
    ).then(this.props.fetchComment);
  };

  render() {
    if (!this.props.state.comment) {
      return "";
    }
    return (
      <>
        <section>
          <ul>
            {this.props.comment.map((singleComment) => {
              return (
                <Comments
                  key={singleComment.id}
                  comment={singleComment}
                  handelDelete={this.handelDelete}
                  user={this.props.user}
                />
              );
            })}
          </ul>
        </section>
      </>
    );
  }
}

export default Comment;
