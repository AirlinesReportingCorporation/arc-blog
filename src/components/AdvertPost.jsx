import { Component } from "react";

class AdvertPost extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let text = this.props.pretext + <span>this.props.highlight</span> + this.props.posttext;
    return (
      <div style={{display: this.props.display? "inline-block": 'none'}}
        className={
          this.props.size
            ? this.props.size
            : "col-xs-12 col-sm-6 col-md-4 col-xl-3 blog-columns"
        }
      >
        <a href={this.props.link}>
          <div
            className="blog-post"
            style={{
              backgroundColor: this.props.color ? this.props.color : "#f7f5f6",
              overflow: "hidden",
            }}
          >
            <div className="advertInner">
              <div className="advertTitle">{this.props.title}</div>
              <div className="advertText">{this.props.pretext} <span className="advertHighlight">{this.props.highlight}</span>{this.props.posttext}</div>
            </div>
              <div className="advertCta"> Refund Information
              </div>
          </div>
        </a>
      </div>
    );
  }
}

export default AdvertPost;
