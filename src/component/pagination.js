import React from "react";
import { Link } from "react-router-dom";
import "../styles/page.css";
import { withRouter } from "../utils/withRouter";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: {},
      data: null,
      articleLength: 0,
      articlePerPage: 4,
      activePage: 1,
      error: "",
    };
  }

  render() {
    const { total, activePage } = this.props;
    let numberOfPage = Math.ceil(total / this.state.articlePerPage);
    let pageArray = [];

    for (let i = 1; i <= numberOfPage; i++) {
      pageArray.push(i);
    }

    return (
      <>
        <section className="flex">
          <div>
            <p
              onClick={() =>
                this.props.onPageChange(activePage - 1 < 1 ? 1 : activePage - 1)
              }
            >
              Prev
            </p>
          </div>
          <div>
            {pageArray.map((page) => {
              console.log(activePage, page, activePage === page);
              return (
                <Link
                  className={`${activePage === page ? "focus page" : "page"}`}
                  key={page}
                  exact="true"
                  to=""
                >
                  <span onClick={() => this.props.onPageChange(page)}>
                    {page}
                  </span>
                </Link>
              );
            })}
          </div>
          <div>
            <p
              onClick={() =>
                this.props.onPageChange(
                  activePage + 1 > numberOfPage ? numberOfPage : activePage + 1
                )
              }
            >
              Next
            </p>
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Pagination);
