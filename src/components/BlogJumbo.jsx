import { Component } from "react";
import BlogPost from "./BlogPost";

class BlogJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = [{
      icon: "ARC-Moves-Direct-Connect-NDC-Forward",
      timeread: "1 min read",
      title: "ARC Moves Direct Connect and NDC Forward",
      text: "Interest in ARC’s Direct Connect is skyrocketing. Learn how much the program has grown in 2022 and plans for future expansion.",
      link: '/articles-trends/the-latest/ARC-Moves-Direct-Connect-NDC-Forward/',
      tags: ['Connection', 'Data'],
      advert: false
    }];
    var featured = [
      {
        icon: "unauthorized-ticketing-fraud",
        timeread: "2 MIN READ",
        title: "Unauthorized Ticketing: How to Avoid Devastating Financial Losses",
        text: "Interest in ARC’s Direct Connect is skyrocketing. Learn how much the program has grown in 2022 and plans for future expansion.",
        link: 'https://www2.arccorp.com/articles-trends/the-latest/unauthorized-ticketing-fraud/',
        tags: ['Connection', 'Data', 'Distribution'],
        advert:false
      },
      {
        icon: "top-10-blogs-2022",
        timeread: "4 MIN READ",
        title: "ARC Moves Direct Connect and NDC Forward",
        text: "Interest in ARC’s Direct Connect is skyrocketing. Learn how much the program has grown in 2022 and plans for future expansion.",
        link: 'https://www2.arccorp.com/articles-trends/the-latest/top-10-blogs-2022/',
        tags: ['Connection', 'Distribution'],
        advert: false
      },
    ];
    return (
      <div className="blog-jumbo">
        <div className="row no-gutters jumbo-row">
          {jumboPost.map((jumbo) => (
            <div className="col-lg-6">
              <a href={"https://www2.arccorp.com" + jumbo.link}>
                <div
                  className="jumbo-left"
                  style={{
                    backgroundImage:
                      "url(https://www2.arccorp.com/globalassets/homepage/redesign/latest/" +
                      jumbo.icon +
                      ".jpg)",
                  }}
                >
                  <div className="blog-jumbo-image">
                    <div className="blog-jumbo-tags">
                      {jumbo.tags.length > 1 ? (
                        jumbo.tags.map((tag, index) => {
                          return (
                            <span key={index}>
                              {tag + (index == !jumbo.tags.length ? " • " : "")}
                            </span>
                          );
                        })
                      ) : (
                        <span>{jumbo.tags}</span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
          <div className="col-sm-12 col-lg-6">
            <div className="jumbo-right">
              {jumboPost.map((jumbo) => (
                <div className="jumbo-info bg-color-tarmac">
                  <div className="jumbo-metadata">
                    <span>{jumbo.timeread}</span>
                  </div>
                  <div
                    className="blog-jumbo-title"
                    style={{
                      color: this.props.color ? this.props.color : "white",
                    }}
                  >
                    <a href={"https://www2.arccorp.com" + jumbo.link}>
                      {jumbo.title}
                    </a>
                  </div>
                  <div className="jumbo-text">{jumbo.text}</div>
                  <div className="featured-row">
                    <div className="row">
                      {featured.map((post) => (
                        <BlogPost
                          color="white"
                          size="col-xs-12 col-sm-6"
                          image={
                            "https://www2.arccorp.com/globalassets/homepage/redesign/latest/" +
                            post.icon +
                            ".jpg"
                          }
                          timeread={post.timeread}
                          link={post.link}
                          title={post.title}
                          tags={post.tags}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogJumbo;
