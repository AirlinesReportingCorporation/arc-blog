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
    };
  }

  componentDidMount() {
    if (this.state.filter == "") {
      this.getPosts(this.state.prevIndex, this.state.curIndex);
    } else {
      this.getFilteredPosts(this.state.filteredIndex);
    }

    let btns = document.querySelectorAll(".filter-choice");
    console.log(btns);
    let filterItem = "";
    // Add the event listener to each filter item
    btns.forEach((item) => {
      item.addEventListener("click", (e) => {
        filterItem = e.target.innerText.toLowerCase();
        console.log(filterItem)
        // on click, clear the active button
        btns.forEach(function(btn) {
          btn.classList.remove('active-filter')
        });

        //add the active class to the clicked item
          e.target.classList.add("active-filter");

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
    // We return the next 8 items -- the first time running will be 0 - 7th index
    console.log("empty, return all");
    // Notes:
    // We may need to change the show more function to reflect if there is a filter as well otherwise its only showing potentially any within the next 8 indecies.
  };

  getFilteredPosts = (startIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    let i = startIndex;
    let tempIndex = 0;
    while (i < postArray.length && tempIndex < 8) {
      const post = postArray[i];
      var tempPosts = this.state.posts;
      console.log(
        post
          .querySelector(".content-block--pageItem__metadata")
          .firstElementChild.innerText.toLowerCase()
          .indexOf(this.state.filter)
      );
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
        console.log(tempPosts);
        tempIndex++;
        i++;
        // maybe can use tempindex to create an alternative show more?
        console.log("Temp Index" + tempIndex);
        console.log("while index" + i);
      } else {
        i++;
        console.log("Temp Index" + tempIndex);
        console.log("while index" + i);
      }
      this.setState({ filteredIndex: i });
    }
    this.setState({ posts: tempPosts });
    // if it is then push that post to the array and increment the num of posts until we have 6
    // otherwise keep going through the array until we get 6 more.
    console.log("There is a filter: " + this.state.filter);
  };

  showMore = () => {
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
      console.log(this.state.filteredIndex + "from show more");
      var tempIndex = this.state.filteredIndex;
      console.log(tempIndex + "from show more");
      this.getFilteredPosts(tempIndex);
    }
    console.log("click");
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
