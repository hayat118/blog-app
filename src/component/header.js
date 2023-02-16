import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/index.css";
// import Hero from "../component/hero";

function Header(props) {
  return (
    <section>
      <div>
        <nav>{props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}</nav>
      </div>
    </section>
  );
}

function NonAuthHeader() {
  return (
    <section className="flex justify padding-50">
      <div>
        <NavLink className="logo" to="/">
          conduit
        </NavLink>
      </div>
      <div>
        <ul className="flex ">
          <li>
            <NavLink exact="true" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/signin">
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/signup">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

function AuthHeader() {
  return (
    <section className="flex justify padding-50">
      <div>
        <NavLink className="logo" to="/">
          conduit
        </NavLink>
      </div>
      <div>
        <ul className="flex ">
          <li>
            <NavLink exact="true" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/newpost">
              New Articles
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/setting">
              Setttings
            </NavLink>
          </li>
          <li>
            <NavLink exact="true" to="/profile">
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Header;
