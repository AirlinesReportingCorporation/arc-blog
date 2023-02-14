import React, { Component } from "react";
import { Stickynav } from "arccorp-vars";
import BlogJumbo from "./components/BlogJumbo";
import BlogPost from "./components/BlogPost";
import PopularArtcles from "./components/PopularArticles";

const arrayMax = 8;

var stuff = ["All", "Distribution", 3, 4, 5];
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      curIndex: arrayMax,
      prevIndex: 0,
      filter: "",
      filteredIndex: 0,
      jumboPosts: [],
      tempIndexHolder: 0,
      showViewMore: false,
    };
  }

  componentDidMount() {
    if (this.state.filter == "") {
      this.getPosts(this.state.prevIndex, this.state.curIndex);
    } else {
      this.getFilteredPosts(this.state.filteredIndex);
    }
  }

  getPosts = (startIndex, endIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    let i = startIndex;
    while (i < endIndex) {
      const post = postArray[i];
      var tempPosts = this.state.posts;
      tempPosts.push({
        link: post.querySelector(".ctaLink").getAttribute("href"),
        title: post.querySelector(".ctaLink").getAttribute("title"),
        tags: post
          .querySelector(".content-block--pageItem__metadata")
          .firstElementChild.innerHTML.split(","),
        date: post.querySelector(".content-block--pageItem__metadata")
          .lastElementChild.innerHTML,
        icon: post.querySelector(".ctaLink").getAttribute("href").split("/")[3],
        text: post.querySelector(".content-block--pageItem__body").innerText,
      });
      i++;
    }
    console.log(i == postArray.length);
    // check if done looping full post array, set condition
    if (i == postArray.length) {
      this.setState({ showViewMore: false });
    } else {
      this.setState({ showViewMore: true });
    }

    this.setState({ posts: tempPosts });
    this.setState({ jumboPosts: tempPosts });
    // Notes:
    // We may need to change the show more function to reflect if there is a filter as well otherwise its only showing potentially any within the next 8 indecies.
  };

  getFilteredPosts = (startIndex) => {
    // Get the list of blog posts
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    console.log(postArray);
    // Set the index to the starting index given, and reset temp index to 0;
    let i = startIndex;
    let tempIndex = 0;
    // As long as the index is not at the end of the posts array and temp index hasn't reached 8
    while (i < postArray.length && tempIndex < arrayMax) {
      // set post to the current post
      const post = postArray[i];
      // make a copy of the posts array
      var tempPosts = this.state.posts;
      // If the post has the filter push it
      if (
        post
          .querySelector(".content-block--pageItem__metadata")
          .firstElementChild.innerText.toLowerCase()
          .indexOf(this.state.filter) > -1
      ) {
        tempPosts.push({
          link: post.querySelector(".ctaLink").getAttribute("href"),
          title: post.querySelector(".ctaLink").getAttribute("title"),
          tags: post
            .querySelector(".content-block--pageItem__metadata")
            .firstElementChild.innerHTML.split(","),
          date: post.querySelector(".content-block--pageItem__metadata")
            .lastElementChild.innerHTML,
          icon: post
            .querySelector(".ctaLink")
            .getAttribute("href")
            .split("/")[3],
        });
        // Update the index and the temp index
        tempIndex++;
        i++;
      } else {
        // Otherwise, just go to the next index
        i++;
      }
      // keeping track of the most recent post checked
      this.setState({ filteredIndex: i });
    }

    // check if done looping full post array, set condition
    if (i == postArray.length) {
      this.setState({ showViewMore: false });
    } else {
      this.setState({ showViewMore: true });
    }

    // set the posts array to the newly filtered posts array
    this.setState({ posts: tempPosts });
  };

  showMore = () => {
    console.log(this.state.filter);
    // If there isn't a filter
    if (this.state.filter == "") {
      var tempIndex = this.state.curIndex;
      this.setState(
        { prevIndex: tempIndex, curIndex: (tempIndex += arrayMax) },
        () => {
          this.getPosts(this.state.prevIndex, this.state.curIndex);
        }
      );
      console.log("show more with no filter");
    } else {
      // make a copy of the last filtered index and give it as a starting point for getting more filtered posts
      var tempIndex = this.state.filteredIndex;
      this.getFilteredPosts(tempIndex);
    }
  };

  setFilter(val) {
    this.setState({ filteredIndex: 0, posts: [] }, () => {
      this.setState({ filter: val.toLowerCase() }, () =>
        this.getFilteredPosts(0)
      );
    });
  }

  render() {
    return (
      <div className="arc-blog-page">
        <Stickynav title="Articles"></Stickynav>
        <div className="arc-blog-top">
          {/* Need to add in the ability to change color */}
          <PopularArtcles />
          <BlogJumbo featuredPosts={this.state.jumboPosts} />
        </div>
        <div className="container">
          <div className="row blog-nav">
            <div className="col-auto">
              <div className="row">
                <div
                  className={
                    this.state.filter == ""
                      ? "col-auto nav-col filter-choice active-filter"
                      : "col-auto nav-col filter-choice"
                  }
                  onClick={this.setFilter.bind(this, "")}
                >
                  All
                </div>
                <div className="col-auto nav-col">|</div>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="row">
                <div className="col-auto nav-col">Thought Leadership</div>
                <div className="col-auto nav-col">GBTA</div>
                <div
                  className={
                    this.state.filter == "data"
                      ? "col-auto nav-col filter-choice active-filter"
                      : "col-auto nav-col filter-choice"
                  }
                  onClick={this.setFilter.bind(this, "Data")}
                >
                  Data
                </div>
                <div
                  className="col-auto nav-col"
                  onClick={this.setFilter.bind(this, "Airlines")}
                >
                  Airlines
                </div>
                <div className="col-auto nav-col">Agencies</div>
                <div
                  className={
                    this.state.filter == "omnichannel"
                      ? "col-auto nav-col filter-choice active-filter"
                      : "col-auto nav-col filter-choice"
                  }
                  onClick={this.setFilter.bind(this, "Omnichannel")}
                >
                  Omnichannel
                </div>
                <div
                  className={
                    this.state.filter == "ndc"
                      ? "col-auto nav-col filter-choice active-filter"
                      : "col-auto nav-col filter-choice"
                  }
                  onClick={this.setFilter.bind(this, "NDC")}
                >
                  NDC
                </div>
                <div className="col-auto nav-col">Travel Connect</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container blog-posts-header">
          <div className="row">
            <div className="col-lg-12" style={{ padding: 0 }}>
              <h2 className="text-left blog-latest">Latest Stories</h2>
            </div>
          </div>
        </div>
        <div className="blog-posts">
          <div className="container" style={{ maxWidth: "1200px" }}>
            <div className="container" style={{ maxWidth: "1280px" }}>
              <div className="row">
                {this.state.posts.map((post) => (
                  <BlogPost
                    title={post.title}
                    link={post.link}
                    tags={post.tags}
                    date={post.date.substring(0, post.date.indexOf(","))}
                    icon={post.icon}
                  />
                ))}{" "}
              </div>
            </div>
            <div className="text-center blog-ctaBtn">
              <a
                onClick={this.showMore}
                style={{
                  display: this.state.showViewMore ? "inline-block" : "none",
                  width: "220px",
                }}
                className="ctaBtn"
              >
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
