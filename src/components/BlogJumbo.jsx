import React, { Component } from "react";
import BlogPost from "./BlogPost";

class BlogJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = this.props.featuredPosts.slice(0, 1);
    console.log(jumboPost);
    var featured = this.props.featuredPosts.slice(1, 3);
    console.log(featured);
    return (
      <div className="blog-jumbo">
        <div className="row no-gutters jumbo-row">
          {jumboPost.map((jumbo) => (
            <div className="col-lg-6">
              <div className="jumbo-left" style={{
                    backgroundImage:
                      "url(https://www2.arccorp.com/globalassets/homepage/redesign/latest/" +
                      jumbo.icon +
                      ".jpg)",
                  }}>
                <div
                  className="blog-jumbo-image"
                >
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
            </div>
          ))}
          <div className="col-lg-6">
            <div className="jumbo-right">
              {jumboPost.map((jumbo) => (
                <div className="jumbo-info bg-color-tarmac">
                  <div className="jumbo-metadata">
                    <span>{jumbo.date}</span>
                    <span>1 min read</span>
                  </div>
                  <div
                    className="blog-jumbo-title"
                    style={{
                      color: this.props.color ? this.props.color : "white",
                    }}
                  >
                    <a href={jumbo.link}>{jumbo.title}</a>
                  </div>
                  <div className="jumbo-text">{jumbo.text}</div>
                </div>
              ))}
              <div className="row featured-row">
                <BlogPost
                  color="white"
                  size="col-lg-6"
                  image="https://www2.arccorp.com/globalassets/homepage/redesign/latest/book-now-pay-later-options-for-travel-agencies.jpg"
                  link="https://www2.arccorp.com/articles-trends/the-latest/book-now-pay-later-options-for-travel-agencies/"
                  title="Travel Agents: Empower Your Customers to Book Now and Pay Laterd"
                  tags={["Connection", "Distribution"]}
                  date="Dec 3"
                />
                <BlogPost
                  color="white"
                  size="col-lg-6"
                  image="https://www2.arccorp.com/globalassets/homepage/redesign/latest/Attract-More-Visitors-Destination-Gateway.jpg"
                  link="https://www2.arccorp.com/articles-trends/the-latest/ARC-Moves-Direct-Connect-NDC-Forward/?utm_source=Jumbo_Blog"
                  title="ARC Moves Direct Connect and NDC Forward"
                  tags={["Connection", "Data"]}
                  date="Jan 3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogJumbo;
