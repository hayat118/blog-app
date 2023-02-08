import React from "react";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <section>
          <div className="header">
            <h1>conduit</h1>
            <p className="header-p">A place to share your knowledge</p>
          </div>
        </section>
      </>
    );
  }
}
export default Hero;
