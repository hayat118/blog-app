import React from "react";
import { Link } from "react-router-dom";

// class Comments extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <>
//         <section>
//            <div>
//              <p>{body}</p>
//            </div>
//         </section>
//       </>
//     );
//   }
// }
// export default Comments;

function Comments(props) {
  console.log(props, "propsss");

  console.log(props.comment, "comment");
  let { body, author, createdAt } = props.comment;

  return (
    <section className="comment-box ">
      <div>
        <p>{body}</p>
      </div>

      <div className="comment flex">
        <Link to="/profile">{author ? author.username : "No user"}</Link>
        <span>{createdAt}</span>
      </div>
      {props.user === null ? (
        ""
      ) : (
        <div>
          <button onClick={props.handleDelete}>Delete</button>
        </div>
      )}
    </section>
  );
}
export default Comments;
