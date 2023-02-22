import { Component } from "react";
import { motion } from "framer-motion";

class AdvertPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let text = this.props.pretext + <span>this.props.highlight</span> + this.props.posttext;
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
            <motion.div className="advertInner" whileHover={{ scale: 1.1 }}>
              <div className="advertTitle">{this.props.title}</div>
              <div className="advertText">{this.props.pretext} <span className="advertHighlight">{this.props.highlight}</span>{this.props.posttext}</div>
            </motion.div>
            <a href={this.props.link}>
              <div className="advertCta"> Refund Information
              </div>
              </a>
          </div>
        </a>
      </div>
    );
  }
}

export default AdvertPost;
