import Header from "./Header";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";

import Single from "./SingleArticle";
import React from "react";
import Newpost from "./Newpost";
import Setting from "./Setting";
import Profile from "./Profile";
import Nomatch from "./Nomatch";
import EditArticle from "./EditArticle";

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

        {this.state.isLoggedIn ? (
          <this.AuthenticatedApp user={this.state.user} />
        ) : (
          <this.UnauthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        )}
      </>
    );
  }

  AuthenticatedApp(props) {
    // let slug = this.props.router.params.id;

    return (
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:id" element={<Single user={props.user} />} />
        <Route path="/newpost" element={<Newpost user={props.user} />} />
        <Route
          path="/setting"
          element={<Setting user={props.user} updateUser={props.updateUser} />}
        />
        <Route path="/profile" element={<Profile user={props.user} />} />
        <Route
          path={`/editArticle/:id`}
          element={<EditArticle user={props.user} />}
        />
      </Routes>
    );
  }

  UnauthenticatedApp(props) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Single user={props.user} />} />

        <Route
          path="/signup"
          element={<Signup updateUser={props.updateUser} />}
        />
        <Route
          path="/signin"
          element={<Signin updateUser={props.updateUser} />}
        />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    );
  }
}
export default App;
