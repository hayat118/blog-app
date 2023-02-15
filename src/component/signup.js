import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "../utils/withRouter";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      username: "",
      email: "",
      password: "",
      user: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
  }

  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;
    this.setState({ errors, [name]: value, user: value });

    switch (name) {
      case "username":
        errors.username =
          value.length >= 5
            ? ""
            : "Username should be at least 5 charactes long";
        break;
      case "email":
        errors.email = value.includes("@") ? "" : "Email should contain @";
        break;

      case "password":
        errors.password =
          value.length >= 5
            ? ""
            : "password should be at least of 5 characters";
        break;
      default:
        break;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;

    fetch("https://conduitapi.onrender.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
            // throw new Error("Fetch not successful");
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: "", email: "", password: "" });

        this.props.router.navigate("/signin");
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <>
        <div className="form-box">
          <form
            onSubmit={(event) => {
              this.handleSubmit(event);
            }}
          >
            <h2>Sign Up</h2>
            <NavLink to="/signin">Have an account ?</NavLink>
            <br />
            <input
              onChange={this.handleInput}
              value={this.state.username}
              name="username"
              type="text"
              placeholder="Username"
            />
            <p>{this.state.errors.username}</p>
            <br />
            <input
              onChange={this.handleInput}
              value={this.state.email}
              name="email"
              type="email"
              placeholder="Email"
              required
            />
            <p>{this.state.errors.email}</p>

            <br />
            <input
              onChange={this.handleInput}
              value={this.state.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            <p>{this.state.errors.password}</p>

            <br />
            <button className="" type="submit">
              Sign Up
            </button>
            {/* <Link className="sign" to="">
              Sign Up
            </Link> */}
          </form>
        </div>
      </>
    );
  }
}
export default withRouter(Signup);
