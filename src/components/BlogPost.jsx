import React, { Component } from "react";

function imageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);

  http.send();

  return http.status != 404;
}

class BlogPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var index = this.props.tags.indexOf("Latest");
    if (index > -1) {
      this.props.tags.splice(index, 1);
    }

    var imageUrl = "";

    this.props.image
      ? (imageUrl = this.props.image)
      : imageExists(
          "https://www2.arccorp.com/globalassets/homepage/redesign/latest/" +
            this.props.icon +
            ".jpg"
        )
      ? (imageUrl =
          "https://www2.arccorp.com/globalassets/homepage/redesign/latest/" +
          this.props.icon +
          ".jpg")
      : (imageUrl = "");
    return (
      <div
        className={this.props.size ? this.props.size : "col-lg-3 blog-columns"}
      >
        <a href={"https://www2.arccorp.com" + this.props.link}>
          <div
            className="blog-post"
            style={{
              backgroundColor: this.props.color ? this.props.color : "#f7f5f6",
            }}
          >
            <div className="post-top">
              <div
                className="blog-post-icon"
                style={{
                  backgroundImage: "url(" + imageUrl + ")",
                  height: "275px",
                }}
              >
                <div className="blog-post-tags">
                  {this.props.tags.length > 1 ? (
                    this.props.tags.map((tag, index) => {
                      return (
                        <span key={index}>{(index ? " • " : "") + tag}</span>
                      );
                    })
                  ) : (
                    <span>{this.props.tags}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="post-bottom">
              <div className="blog-post-data">
                <span className="blog-post-date">{this.props.date}</span>
              </div>

              <a
                href={"https://www2.arccorp.com" + this.props.link}
                className="blog-title"
              >
                {this.props.title}
              </a>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default BlogPost;
