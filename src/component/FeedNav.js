import React from "react";
import { Link } from "react-router-dom";

function FeedNav(props) {
  console.log(props, "props");

  return (
    <nav>
      <ul>
        <li>
          <Link className={props.activeTab === "" && "active"} to="/">
            Global Feed
          </Link>
        </li>
        {props.activeTab && (
          <li>
            <Link className={props.activeTab && "active"} to="/">
              {props.activeTab}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default FeedNav;
