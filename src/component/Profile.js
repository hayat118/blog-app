import React from "react";
import "../styles/index.css";
import { withRouter } from "../utils/withRouter";
import Posts from "./Posts";
import ProfileBanner from "./ProfileBanner";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "author",
      articles: [],
    };
  }

  fetchArticles = () => {
    fetch(
      `https://conduitapi.onrender.com/api/articles/?${this.state.activeTab}=${this.props.user.username}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Can not fetch data for specific user");
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: "Not able to fetch data" });
      });
  };

  componentDidMount() {
    this.fetchArticles();
  }

  handleActive = (tab) => {
    this.setState({ activeTab: tab }, () => {
      this.fetchArticles();
    });
  };

  render() {
    // console.log(this.state.articles, "aaaa");
    const { activeTab } = this.state;
    const { user } = this.props;
    return (
      <>
        <section>
          <ProfileBanner user={user} />

          <div className="flex">
            <button
              onClick={() => this.handleActive("author")}
              className={activeTab === "author" ? "active" : ""}
            >
              My Articles
            </button>
            <button
              onClick={() => this.handleActive("favorited")}
              className={activeTab === "favorited" ? "active" : ""}
            >
              Favorited Articles
            </button>
          </div>
          <div>
            <Posts articles={[this.state.articles]} />
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(Profile);
