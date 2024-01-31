import { Component } from "react";
import BlogPost from "./BlogPost";

class BlogJumbo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var jumboPost = [{
      icon: "2024-air-travel-hacks-report",
      timeread: "1 min read",
      title: "2024 Air Travel Hacks Report",
      text: "Expedia and ARC Release 2024 Air Travel Hacks Report",
      link: '/articles-trends/the-latest/2024-air-travel-hacks-report/',
      tags: ['NDC','Distribution', 'Omnichannel'],
      advert: false
    }];

    var featured = [
      {
        icon: "fraud-awareness-webinar-recap-2023-schemes-2024-readiness",
        timeread: "1 MIN READ",
        title: "Fraud Awareness Webinar Recap: 2023 Schemes & 2024 Readiness",
        text: "Learn about critical fraud awareness insights and practical tips to prepare your travel agency for security challenges in 2024.",
        link: '/articles-trends/the-latest/fraud-awareness-webinar-recap-2023-schemes-2024-readiness/',
        tags: ['Data', 'Innovation'],
        advert:false
      },
      {
        icon: "unleashing-innovation-a-recap-of-2023-and-a-glimpse-into-2024",
        timeread: "3 min read",
        title: "Unleashing Innovation: A Recap of 2023 and a Glimpse into 2024",
        text: "As we usher in a new year, we're thrilled to take a moment to reflect on the incredible strides we've made together in 2023 and share a sneak peek into the exciting developments awaiting you in 2024.",
        link: '/articles-trends/the-latest/unleashing-innovation-a-recap-of-2023-and-a-glimpse-into-2024/',
        tags: ['NDC', 'Distribution','Innovation'],
        advert: false
      }
    ];
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
                            <span key={index}>{(index ? " • " : "") + tag}</span>
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
                    <span>{jumbo.timeread}</span>
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
                          timeread={post.timeread}
                          link={post.link}
                          title={post.title}
                          tags={post.tags}
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
