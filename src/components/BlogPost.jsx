import React, { Component } from "react";

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blog-post blog-post-hr">
        <div className="row">
          <div className="col-md-8">
            <div className="blog-post-data">
              <div className="blog-post-tags">
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
              <span className="blog-post-date">{this.props.date}</span>
            </div>
            <a href={this.props.link} className="blog-title">
              {this.props.title}
            </a>
          </div>
          <div className="col-md-4 text-right">
            <a href={this.props.link}>
              <img
                className="blog-image"
                src={this.props.icon}
                alt="blog-picture"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogPost;
