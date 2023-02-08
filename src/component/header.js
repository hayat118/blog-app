import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/index.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <section className="flex justify padding-50">
          <div>
            <NavLink to="">conduit</NavLink>
          </div>
          <div>
            <ul className="flex ">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </ul>
          </div>
        </section>
      </>
    );
  }
}
export default Header;
