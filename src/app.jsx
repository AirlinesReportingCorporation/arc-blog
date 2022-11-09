import React, { Component } from "react";
import BlogJumbo from "./components/BlogJumbo";
import BlogPost from "./components/BlogPost";

class Blog extends Component {
  constructor() {
    super();
  }

  data = {
    title: "ARC Moves Direct Connect and NDC Forward",
    link: "https://www2.arccorp.com/articles-trends/the-latest/ARC-Moves-Direct-Connect-NDC-Forward/",
    tags: ["conecton", "data"],
    icon: "https://www2.arccorp.com/globalassets/homepage/redesign/latest/ARC-Moves-Direct-Connect-NDC-Forward.jpg",
    date : "Nov 1, 2022"
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
            <div className="blog-posts-header">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="text-left">All Stories</h2>
                </div>
                <div className="col-lg-6"><div className="text-right">Sort feature here</div></div>
              </div>
            </div>
            {/* {data.map(post=> ( */}
              <BlogPost 
              title={this.data.title}
              link={this.data.link}
              tags={this.data.tags}
              date={this.data.date}
              icon={this.data.icon}
              />
            {/* ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
