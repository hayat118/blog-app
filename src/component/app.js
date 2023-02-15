import Header from "./header";
import Home from "./home";
import { Routes, Route } from "react-router-dom";
import Signup from "./signup";
import Signin from "./signin";

import Single from "./singleArticle";
import React from "react";
// import Spinner from "./spinner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: null,
      // isVarifying: true,
    };
  }

  componentDidMount() {
    if (localStorage["app_user"]) {
      fetch("https://conduitapi.onrender.com/api/user", {
        method: "GET",
        headers: {
          Authorization: `${localStorage["app_user"]}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            // this.setState({ isLoggedIn: true });
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((errors) => console.log(errors));
    }
  }

  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user: user,
      // isVarifying:false,
    });
    localStorage.setItem("app_user", user.token);
  };

  render() {
    // if (this.state.isVarifying) {
    //   return <Spinner />;
    // }
    return (
      <>
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={<Signup updateUser={this.updateUser} />}
          />
          <Route
            path="/signin"
            element={<Signin updateUser={this.updateUser} />}
          />
          <Route path="/:id" element={<Single />} />
        </Routes>
      </>
    );
  }
}
export default App;
