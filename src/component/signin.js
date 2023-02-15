import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/index.css";
import { withRouter } from "../utils/withRouter";
// import { navigator } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  hanldeInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;

    this.setState({ [name]: value, errors });

    switch (name) {
      case "email":
        errors.email = value.includes("@") ? "" : "Email should contain @";

        break;

      case "password":
        errors.password =
          value.length >= 5 ? "" : "password should be atleast of 5 characters";
        break;

      default:
        break;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    fetch("https://conduitapi.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { email, password } }),
    })
      .then((res) => {
        console.log(res, "res");
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        console.log(user, this.props, "hist");
        this.props.updateUser(user);
        this.setState({ email: "", password: "" });
        this.props.router.navigate("/");
      })

      .catch((errors) => {
        this.setState((prevState) => {
          return {
            ...prevState,
            errors: {
              ...prevState.errors,
              email: "Email or Password is incorrect!",
            },
          };
        });
      });
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
            <h2>Sign In</h2>
            <NavLink to="/signup">Need an account ?</NavLink>
            <br />
            <input
              onChange={this.hanldeInput}
              value={this.state.email}
              name="email"
              type="email"
              placeholder="Email"
            />
            <p>{this.state.errors.email}</p>

            <br />
            <input
              onChange={this.hanldeInput}
              value={this.state.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            <p>{this.state.errors.password}</p>

            <br />
            <button className="" type="submit">
              Sign In
            </button>
            {/* <Link className="sign" to="">
              Sign In
            </Link> */}
          </form>
        </div>
      </>
    );
  }
}
export default withRouter(Signin);
