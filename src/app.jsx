import React, { Component } from "react";
import BlogJumbo from "./components/BlogJumbo";
import BlogPost from "./components/BlogPost";

class Blog extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      curIndex: 6,
      prevIndex: 0,
      filter: "data",
    };
  }

  componentDidMount() {
    this.getPosts(this.state.prevIndex, this.state.curIndex);
  }

  getPosts = (startIndex, endIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    console.log(postArray);
  //  Check to see if the filter is an empty string
  if(this.state.filter === "") {
    console.log('empty, return all')
  }
  else if (this.state.filter !== ""){
    console.log("There is a filter: " + this.state.filter)
  }
  // If it is then
      // We return the next 6 items -- the first time running will be 0 - 5th index
  // If it is not an empty string then check the tags of the post to see if its in there
      // if it is then push that post to the array and increment the num of posts until we have 6
      // otherwise keep going through the array until we get 6 more.

      // Notes:
      // We may need to change the show more function to reflect if there is a filter as well otherwise its only showing potentially any within the next 6 indecies. 
  };

  showMore = () => {
    var tempIndex = this.state.curIndex;
    this.setState({ prevIndex: tempIndex, curIndex: (tempIndex += 6) }, () => {
      this.getPosts(this.state.prevIndex, this.state.curIndex);
    });
    console.log("click");
  };

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
                <div className="col-lg-6">
                  <div className="text-right">Sort feature here</div>
                </div>
              </div>
            </div>
            {/* Figure out how to get this in react without dom manipulation */}
            {this.state.posts.map((post) => (
              <BlogPost
                title={post.title}
                link={post.link}
                tags={post.tags}
                date={post.date}
                icon={post.icon}
              />
            ))}{" "}
            <div className="text-center">
              <a onClick={this.showMore} className="ctaBtn">
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
