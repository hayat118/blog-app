// import React from "react";

// class ProfileBanner extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <>
//         <div>
//           <h3>Profile Banner</h3>
//         </div>
//       </>
//     );
//   }
// }
// export default ProfileBanner;

function ProfileBanner(props) {
  return (
    <>
      <div>
        <h2>{props.user.username}</h2>
      </div>
      <div>
        <p>
          {" "}
          +follow <span>{props.user.username}</span>
        </p>
      </div>
    </>
  );
}
export default ProfileBanner;
