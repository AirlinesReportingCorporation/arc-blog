import React, { Component } from "react";
import BlogJumbo from "./components/BlogJumbo";

class Blog extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="arc-blog-page">
        <BlogJumbo
          background="https://www2.arccorp.com/globalassets/homepage/redesign/slides/arcpay-jumbo.jpg"
          link="https://www2.arccorp.com/articles-trends/the-latest/5-Things-Every-Agency-Should-Know-About-Processing-Credit-Card-Payments/?utm_source=Jumbo_Blog"
          title="5 Things Every Agency Should Know About Processing Credit Card Payments"
          tags={["Data", "Innovation"]}
        />
        <div className="blog-posts">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2>All Stories</h2>
              </div>
              <div className="col-lg-6">Sort feature here</div>
            </div>
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
