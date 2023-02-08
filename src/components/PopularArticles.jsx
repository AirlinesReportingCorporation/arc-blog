import React from "react";

export default function PopularArtcles() {

    var popularArticles = [
        {
          date: "Updated Every Monday",
          read: "",
          title: "ARC Data Shows Weekly Air Travel Recovery      ",
          link: "https://www2.arccorp.com/articles-trends/the-latest/coronavirus/",
        },
        {
          date: "Jan 12",
          read: "2 MIN READ",
          title: "ARC’s Top Insights from 2021",
          link:
            "https://www2.arccorp.com/articles-trends/the-latest/arc-top-insights-2021/",
        },
        {
          date: "May 1",
          read: "2 MIN READ",
          title: "ARC’s COVID-19 Resources for Airlines and Travel Agencies",
          link:
            "https://www2.arccorp.com/articles-trends/the-latest/arcs-covid-19-resources-for-airlines-and-travel-agencies/",
        },
        {
          date: "Jan 27",
          read: "1 MIN READ",
          title:
            "Top Corporate Equity Index Score Reflects ARC’s Commitment to Diversity, Inclusion",
          link:
            "https://www2.arccorp.com/articles-trends/the-latest/arc-receives-top-corporate-equity-index-score-2022/",
        },
      ]

    return(
        <div className="container popular-container">
        {/* Most popular Articles here */}
        <div className="popular-title">
            Most Popular Articles
        </div>
        <div className="row">
        {popularArticles.map((article) => (
            <div className="col-lg-3" style={{color: "#2a2b2c"}}>
                <div className="article-outer">
                    <div className="article-inner">
                        <div className="article-tag"><span>{article.date + ' '}</span> {article.read != "" ? (<span>{' • ' +  article.read}</span>): ('')}</div>
                        <a className="article-title" href={article.link}><div>{article.title}</div></a>
                    </div>
                </div>
            </div>))}
        </div>
        </div>
    )
}