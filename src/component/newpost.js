import React from "react";
import "../styles/index.css";

class Newpost extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  render() {
    return (
      <>
        <div className="form-box">
          <form action="">
            <input type="text" name="title" placeholder="Add Titles" />
            <br />
            <input
              type="text"
              name="title"
              placeholder="What is this article about"
            />
            <br />
            <br />
            <textarea name="description" id="" cols="50" rows="10"></textarea>
            <br />
            <input type="text" name="tags" placeholder="Tags" />
            <br />
            <br />
            <button type="submit">Publish Article</button>
          </form>
        </div>
      </>
    );
  }
}
export default Newpost;
