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
    var postArray = Array.from(document.querySelectorAll('.content-block--pageItem__inside'));
    // function createPosts() {
    //   postArray.map(post => ({
    //     link: post.querySelector('.ctaLink').getAttribute('href'),
    //     title: post.querySelector('.ctaLink').getAttribute('title'),
    //     tags: post.querySelector('.content-block--pageItem__metadata').firstElementChild.innerHTML,
    //     date: post.querySelector('.content-block--pageItem__metadata').lastElementChild.innerHTML,
    //     icon: post.querySelector('.ctaLink').getAttribute('title').split('/')[3]
    //   }))
    // }
    console.log(postArray)
    // const title = postArray[0].querySelector('.ctaLink').getAttribute('HREF');
    // console.log(title.split('/')[3]);
    // console.log(postArray[0].querySelector('.content-block--pageItem__metadata').lastElementChild.innerHTML);
    // var postArray = document.querySelectorAll('.content-block--pageItem__inside').map(post => ({
    //   title: post.title, link: post.lnink, tags: post.tags
    // }));
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
            {/* Figure out how to get this in react without dom manipulation */}
            {postArray.map(post=> (
              <BlogPost 
              title={post.querySelector('.ctaLink').getAttribute('title')}
              link={post.querySelector('.ctaLink').getAttribute('href')}
              tags={post.querySelector('.content-block--pageItem__metadata').firstElementChild.innerHTML.slice(',')}
              date={post.querySelector('.content-block--pageItem__metadata').lastElementChild.innerHTML}
              icon={post.querySelector('.ctaLink').getAttribute('title').split('/')[3]}
              />
            ))} 
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
