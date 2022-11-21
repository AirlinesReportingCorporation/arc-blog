import React, { Component } from "react";
import BlogJumbo from "./components/BlogJumbo";
import BlogPost from "./components/BlogPost";
import Select from 'react-select'

const options = [
  {value: "all topics", label: "All Topics"},
  {value: "innovation", label: "Innovation"},
  {value: "distribution", label: "Distribution"},
  {value: "data", label: "Data"},
  {value: "connection", label: "Connection"}
];

  
class Blog extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      curIndex: 6,
      prevIndex: 0,
      filter: "",
      filteredIndex: 0,
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
    console.log(i);
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
      });
      i++;
    }
    this.setState({ posts: tempPosts });
    // We return the next 6 items -- the first time running will be 0 - 5th index
    console.log("empty, return all");
    // Notes:
    // We may need to change the show more function to reflect if there is a filter as well otherwise its only showing potentially any within the next 6 indecies.
  };

  getFilteredPosts = (startIndex) => {
    var postArray = document.querySelectorAll(
      ".content-block--pageItem__inside"
    );
    let i = startIndex;
    let tempIndex = 0;
    while (i < postArray.length && tempIndex < 6) {
      const post = postArray[i];
      var tempPosts = this.state.posts;
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
        { prevIndex: tempIndex, curIndex: (tempIndex += 6) },
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

  updateFilter = (e) => {
    if (e.toLowerCase() == "all topics") {
      this.setState({ filter: "", filteredIndex: 0, posts: [], prevIndex: 0, curIndex: 6}, () => {
        this.getPosts(this.state.prevIndex, this.state.curIndex);
      });
    } else {
      this.setState(
        { filter: e.toLowerCase(), filteredIndex: 0, posts: [] },
        () => {
          this.getFilteredPosts(0);
        }
      );
    }
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
                  <div className="text-right">
                    <Select options={options} onChange={(e) => this.updateFilter(e.value)} placeholder="All Topics" isClearable={false} isSearchable={false}
 />
                    {/* <select
                      onChange={(e) => this.updateFilter(e.target.value)}
                      id="post-filter"
                    >
                      {options.map((option, id) => (
                        <option className="filter-option" key={id}>{option}</option>
                      ))}
                    </select> */}
                  </div>
                </div>
              </div>
            </div>
            {this.state.posts.map((post) => (
              <BlogPost
                title={post.title}
                link={post.link}
                tags={post.tags}
                date={post.date}
                icon={post.icon}
              />
            ))}{" "}
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
