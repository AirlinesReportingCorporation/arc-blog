import React, { Component } from "react";

class BlogJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blog-jumbo">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12"
              className="text-left blog-jumbo-image"
              style={{
                backgroundImage: "url(" + this.props.background + ")",
                width: "100%",
              }}
            >
              <div>
                <div className="blog-jumbo-tags">
                  {this.props.tags.length > 1 ? (
                    this.props.tags.map((tag, index) => {
                      return (
                        <span key={index}>
                          {tag +
                            (index == !this.props.tags.length ? " • " : "")}
                        </span>
                      );
                    })
                  ) : (
                    <span>{this.props.tags}</span>
                  )}
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogJumbo;
