import React from "react";
// import { useParams } from "react-router-dom";
import { withRouter } from "../utils/withRouter";

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: "",
      // articles: "",
      // data: "",
    };
  }

  componentDidMount() {
    console.log(this.props.router.params, "ab");
    let slug = this.props.router.params.id;
    fetch(`https://conduitapi.onrender.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => this.setState({ slug: data }));
    // .then((data) => console.log(data, "data"));
  }

  render() {
    if (!this.state.slug) {
      return <h2>Fetching</h2>;
    }
    console.log(this.state.slug, "slug");
    return (
      <>
        <h3>Title : {this.state.slug.article.article.title}</h3>
        <p>Body:{this.state.slug.article.article.body}</p>
      </>
    );
  }
}
export default withRouter(Single);
