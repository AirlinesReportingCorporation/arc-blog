import { Component } from "react";
import { motion } from "framer-motion";

function imageExists(image_url) {
  var http = new XMLHttpRequest();

  http.open("HEAD", image_url, false);

  http.send();

  return http.status != 404;
}

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTags: []
    }
  }

  tagReplace = () => {
    var currentTags = this.props.tags;
    var tempTags = [];
    var ndc = false;
    
    for (let i = 0; i < currentTags.length; i++) {
      const currentTag = currentTags[i];
      if (currentTag.indexOf("NDC") > -1 || currentTag.indexOf("Distribution") > -1) {
        ndc = true;
      } else {
        tempTags.push(currentTag);
      }
    }
    if (ndc) {
      tempTags.push("Distribution (NDC)");
    }
    this.setState({postTags: tempTags});
  };

  componentDidMount() {
    this.tagReplace();
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
        className={
          this.props.size
            ? this.props.size
            : "col-xs-12 col-sm-6 col-md-4 col-xl-3 blog-columns"
        }
      >
        <a href={"https://www2.arccorp.com" + this.props.link}>
          <div
            className="blog-post"
            style={{
              backgroundColor: this.props.color ? this.props.color : "#f7f5f6",
              overflow: "hidden",
            }}
          >
            <div className="post-top">
              <div className="blog-post-tags">{this.state.postTags.length > 1 ? (
                  this.state.postTags.map((tag, index) => {
                    return (
                      <span key={index}>{(index ? " • " : "") + tag}</span>
                    );
                  })
                ) : (
                  <span>{this.state.postTags}</span>
                )}</div>
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="blog-post-icon"
                style={{
                  backgroundImage: "url(" + imageUrl + ")",
                  height: "275px",
                }}
              ></motion.div>
            </div>
            <div className="post-bottom">
              <div className="post-bottom-inner">
                <div className="blog-post-data">
                  <span className="blog-post-date">{this.props.timeread}</span>
                </div>
                <div className="blog-title">{this.props.title}</div>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default BlogPost;
