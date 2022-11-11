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
    var index = this.props.tags.indexOf('Latest');
    if (index > -1) {this.props.tags.splice(index, 1)}
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
                        {(index ? " • " : "")+ tag}
                      </span>
                    );
                  })
                ) : (
                  <span>{this.props.tags}</span>
                )}
              </div>
              <span className="blog-post-date">{this.props.date}</span>
            </div>
            <a href={"https://www2.arccorp.com" + this.props.link} className="blog-title">
              {this.props.title}
            </a>
          </div>
          <div className="col-md-4 text-right">

           {imageExists("https://www2.arccorp.com/globalassets/homepage/redesign/latest/" + this.props.icon + ".jpg") ? <a href={this.props.link}>
              <img
                className="blog-image"
                src={"https://www2.arccorp.com/globalassets/homepage/redesign/latest/" + this.props.icon + ".jpg"}
                alt="blog-picture"
              />
            </a> : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default BlogPost;
