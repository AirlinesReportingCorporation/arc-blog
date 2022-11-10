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
      filter: "data"
    };
  }

  componentDidMount() {
    this.getPosts(this.state.prevIndex, this.state.curIndex);
  }

  getPosts = (j, k) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    console.log(postArray);
    // if no selection
    let i = j;
    while (i < k) {
      
      const post = postArray[i];
      var tempPosts = this.state.posts;
      console.log(post
        .querySelector(".content-block--pageItem__metadata")
        .firstElementChild.innerText);
     if (post
      .querySelector(".content-block--pageItem__metadata")
      .firstElementChild.innerText.toLowerCase().indexOf(this.state.filter) > -1) {
      tempPosts.push({
        link: post.querySelector(".ctaLink").getAttribute("href"),
        title: post.querySelector(".ctaLink").getAttribute("title"),
        tags: post
          .querySelector(".content-block--pageItem__metadata")
          .firstElementChild.innerHTML.split(","),
        date: post.querySelector(".content-block--pageItem__metadata")
          .lastElementChild.innerHTML,
        icon: post.querySelector(".ctaLink").getAttribute("href").split("/")[3],
      });
      i++;
     }
     else if (this.state.filter === "") {
      tempPosts.push({
        link: post.querySelector(".ctaLink").getAttribute("href"),
        title: post.querySelector(".ctaLink").getAttribute("title"),
        tags: post
          .querySelector(".content-block--pageItem__metadata")
          .firstElementChild.innerHTML.split(","),
        date: post.querySelector(".content-block--pageItem__metadata")
          .lastElementChild.innerHTML,
        icon: post.querySelector(".ctaLink").getAttribute("href").split("/")[3],
      });
      i++;
     }
     
    }
    this.setState({ posts: tempPosts });

    // if filter then 
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
