import { Component } from "react";
import BlogPost from "./BlogPost";

class BlogJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = this.props.featuredPosts.slice(0, 1);
    var featured = this.props.featuredPosts.slice(1, 4);
    featured.splice(1,1) //remove the advert
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
                    <span>
                      {jumbo.date.substring(0, jumbo.date.indexOf(","))}
                    </span>
                    {" • "}
                    <span>1 min read</span>
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
                          link={post.link}
                          title={post.title}
                          tags={post.tags}
                          date={post.date.substring(0, post.date.indexOf(","))}
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
