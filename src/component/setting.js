import React from "react";
import "../styles/index.css";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {};
  }

  render() {
    return (
      <>
        <div className="form-box">
          <form action="">
            <input
              type="text"
              name="URL"
              placeholder="https://conduitapi.onrender.com/api"
            />
            <br />
            <input type="text" name="username" placeholder="username" />
            <br />
            <br />
            <textarea
              name="bio"
              placeholder="Short Bio"
              id=""
              cols="50"
              rows="10"
            ></textarea>
            <br />
            <input type="email" name="email" placeholder="email" />
            <br />
            <input type="text" name="password" placeholder="New Password" />

            <br />
            <br />
            <button type="submit">Update Setting</button>
          </form>
        </div>
      </>
    );
  }
}
export default Setting;
