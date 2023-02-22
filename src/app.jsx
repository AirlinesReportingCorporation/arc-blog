import { Component } from "react";
import { Stickynav } from "arccorp-vars";
import BlogJumbo from "./components/BlogJumbo";
import BlogPost from "./components/BlogPost";
import AdvertPost from "./components/AdvertPost";
import PopularArtcles from "./components/PopularArticles";
import Select from 'react-select'

const options = [
  {value: "all", label: "All"},
  {value: "Thought Leadership", label: "Thought Leadership"},
  {value: "gbta", label: "GBTA"},
  {value: "data", label: "Data"},
  {value: "airlines", label: "Airlines"},
  {value: "agencies", label: "Agencies"},
  {value: "omnichannel", label: "Omnichannel"},
  {value: "ndc", label: "NDC"},
  {value: "travel connect", label: "Travel Connect"}
]

let arrayMax = 8;

let advertisement = {id:"advertisement",date: "", icon: "", link: "", tags: "", pretext:"Get some of the ", highlight: "best data you can get", posttext:" anywhere", title: "Airline Data", advert: true};


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

  
  addAdvertisement = (postsArray) => {
    if (postsArray.some(post => post.advert === true)) {
      // don't add another advert if one exists
      this.setState({posts: postsArray})
    }
    else if (postsArray.length == 0) {
      this.setState({ posts: postsArray });
    }
    else if (postsArray.length == 2) {
      // push advertisement
      postsArray.push(advertisement)
      this.setState({ posts: postsArray });
    }
    else if (postsArray.length > 2) {
      console.log(postsArray)
      // splice advertisement
      postsArray.splice(2,0,advertisement)
      this.setState({ posts: postsArray });
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
      if (i == 2) {tempPosts.push(advertisement)} //Add advert in 3rd spot
      else {
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
        advert: false,
      });
    }
      i++;
    }
    console.log(i == postArray.length);
    // check if done looping full post array, set condition
    if (i == postArray.length) {
      this.setState({ showViewMore: false });
    } else {
      this.setState({ showViewMore: true });
    }
    this.setState({jumboPosts: [...tempPosts]}, () => {this.addAdvertisement(tempPosts)});
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
    console.log('arrayMax: ' + arrayMax)
    // As long as the index is not at the end of the posts array and temp index hasn't reached 8
    while (i < postArray.length && tempIndex < arrayMax ) {
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
        if (tempIndex == 2 && !this.state.posts.includes(advertisement)) {
          tempPosts.push(advertisement)
          tempIndex ++
        }
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
    this.addAdvertisement(tempPosts);

    // set the posts array to the newly filtered posts array
    // this.setState({ posts: tempPosts });
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
          <PopularArtcles />
          <BlogJumbo featuredPosts={this.state.jumboPosts} />
        </div>
        <div className="blog-container">
          <div className="blog-nav">
            <div className="row justify-content-center">
              <div className="col-auto">
                <Select options={options} onChange={(e) => this.setFilter(e.value)} placeholder="All" isClearable={false} isSearchable={true} className="mobile-filter"></Select>
                <div className="row web-filter">
                  <div className="col-auto">
                    <div
                      className={
                        this.state.filter == ""
                          ? "nav-col filter-choice active-filter"
                          : "nav-col filter-choice"
                      }
                      onClick={this.setFilter.bind(this, "")}
                    >
                      All
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="nav-col">|</div>
                  </div>
                </div>
              </div>
              <div className="col-auto web-filter">
                <div className="row">
                  <div className="col-auto">
                    <div className="nav-col">Thought Leadership</div>
                  </div>
                  <div className="col-auto">
                    <div className="nav-col">GBTA</div>
                  </div>
                  <div className="col-auto">
                    <div
                      className={
                        this.state.filter == "data"
                          ? "nav-col filter-choice active-filter"
                          : "nav-col filter-choice"
                      }
                      onClick={this.setFilter.bind(this, "Data")}
                    >
                      Data
                    </div>
                  </div>
                  <div className="col-auto">
                    <div
                      className="nav-col"
                      onClick={this.setFilter.bind(this, "Airlines")}
                    >
                      Airlines
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="nav-col">Agencies</div>
                  </div>
                  <div className="col-auto">
                    <div
                      className={
                        this.state.filter == "omnichannel"
                          ? "nav-col filter-choice active-filter"
                          : "nav-col filter-choice"
                      }
                      onClick={this.setFilter.bind(this, "Omnichannel")}
                    >
                      Omnichannel
                    </div>
                  </div>
                  <div className="col-auto">
                    <div
                      className={
                        this.state.filter == "ndc"
                          ? "nav-col filter-choice active-filter"
                          : "nav-col filter-choice"
                      }
                      onClick={this.setFilter.bind(this, "NDC")}
                    >
                      NDC
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="nav-col">Travel Connect</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-container blog-posts-header">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="text-left blog-latest">Latest Stories</h2>
            </div>
          </div>
        </div>
        <div className="blog-posts">
          <div className="blog-container">
            <div className="row">
              {this.state.posts.map((post) => (
                post.advert == true ? <AdvertPost 
                title={post.title}
                color={'#2a2b2c'}
                link={post.link}
                pretext={post.pretext}
                highlight={post.highlight}
                posttext={post.posttext}
                display={true}
                /> :
                <BlogPost
                  title={post.title}
                  link={post.link}
                  tags={post.tags}
                  date={post.date.substring(0, post.date.indexOf(","))}
                  icon={post.icon}
                />
              ))}
            </div>
          </div>
          <div className="text-center blog-ctaBtn">
            <a
              onClick={this.showMore}
              style={{
                display: this.state.showViewMore ? "inline-block" : "none",
                width: "220px",
              }}
              className="ctaBtn blog-viewMore"
            >
              View More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
