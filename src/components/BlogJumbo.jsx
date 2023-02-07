import React, { Component } from "react";
import BlogPost from "./BlogPost";

class BlogJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blog-jumbo">
        <div className="row jumbo-row">
          <div
            className="col-lg-5"
            style={{
              padding: 0,
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
          >
            <div
              className="blog-jumbo-image"
              style={{
                backgroundImage: "url(" + this.props.background + ")",
                maxWidth: "590px",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
            >
              <div className="blog-jumbo-tags">
                {this.props.tags.length > 1 ? (
                  this.props.tags.map((tag, index) => {
                    return (
                      <span key={index}>
                        {tag + (index == !this.props.tags.length ? " • " : "")}
                      </span>
                    );
                  })
                ) : (
                  <span>{this.props.tags}</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="blog-jumbo-title"
              style={{
                color: this.props.color ? this.props.color : "white",
              }}
            >
              <a href={this.props.link}>{this.props.title}</a>
            </div>
            <a
              href={this.props.link}
              className="arrowCTA"
              style={{
                color: this.props.color ? this.props.color : "white",
              }}
            >
              Learn More
            </a>
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
    );
  }
}

export default BlogJumbo;
