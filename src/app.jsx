import React, { Component } from "react";
import { Stickynav } from "arccorp-vars";
import BlogJumbo from "./components/BlogJumbo";
import BlogPost from "./components/BlogPost";
import PopularArtcles from "./components/PopularArticles";

const arrayMax = 8;

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
    };
  }

  componentDidMount() {
    if (this.state.filter == "") {
      this.getPosts(this.state.prevIndex, this.state.curIndex);
    } else {
      this.getFilteredPosts(this.state.filteredIndex);
    }

    let btns = document.querySelectorAll(".filter-choice");
    let filterItem = "";
    // Add the event listener to each filter item
    btns.forEach((item) => {
      item.addEventListener("click", (e) => {
        filterItem = e.target.innerText.toLowerCase();
        // on click, clear the active button
        btns.forEach(function (btn) {
          btn.classList.remove("active-filter");
        });

        //add the active class to the clicked item
        e.target.classList.add("active-filter");
        console.log(filterItem)

        if (filterItem == "all") {
          this.setState(
            {
              filter: "",
              filteredIndex: 0,
              posts: [],
              prevIndex: 0,
              curIndex: arrayMax,
            },
            () => {
              this.getPosts(this.state.prevIndex, this.state.curIndex);
            }
          );
        } else {
          this.setState(
            {
              filter: filterItem.toLowerCase(),
              filteredIndex: 0,
              posts: [],
            },
            () => {
              this.getFilteredPosts(0);
            }
          );
        }
      });
    });
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
    // set the posts array to the newly filtered posts array
    this.setState({ posts: tempPosts });
      let showMore = document.querySelector(".blog-ctaBtn");
      if ((this.state.posts.length % 8) != 0) {
        showMore.style.display = "none";
      }
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
    }
     else {
      // make a copy of the last filtered index and give it as a starting point for getting more filtered posts
      var tempIndex = this.state.filteredIndex;
      this.getFilteredPosts(tempIndex);
    }
  };

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
            <div className="nav-col filter-choice">All</div>
            <div className="nav-col">|</div>
            <div className="nav-col">Thought Leadership</div>
            <div className="nav-col">GBTA</div>
            <div className="nav-col filter-choice">Data</div>
            <div className="nav-col">Airlines</div>
            <div className="nav-col">Agencies</div>
            <div className="nav-col filter-choice">Omnichannel</div>
            <div className="nav-col filter-choice">NDC</div>
            <div className="nav-col">Travel Connect</div>
          </div>
        </div>
        <div className="container blog-posts-header">
          <div className="row">
            <div className="col-lg-12" style={{ padding: 0 }}>
              <h2 className="text-left">Latest Stories</h2>
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
