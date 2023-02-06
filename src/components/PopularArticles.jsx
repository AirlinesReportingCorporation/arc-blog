import React from "react";

export default function PopularArtcles() {

    return(
        <div className="container" style={{maxWidth: "1200px", marginTop:"60px", marginBottom: "60px"}}>
        {/* Most popular Articles here */}
        <div style={{color: "#2a2b2c", fontWeight: "bold", marginBottom: "15px"}}>
            Most Popular Articles
        </div>
        <div className="row">
            <div className="col-lg-3" style={{color: "#2a2b2c"}}>
                <div className="article-outer" style={{borderTop: "1px solid #2a2b2c"}}>
                    <div className="article-inner">
                        <div style={{paddingTop:"15px"}}><span style={{textTransform: "uppercase"}}>Dec 1 • 1 Min Read</span></div>
                        <div style={{fontWeight: "bold"}}>BTN'S 2022 Travel Manager of the Year Award Show Value of NDC</div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3" style={{color: "#2a2b2c"}}>
                <div className="article-outer" style={{borderTop: "1px solid #2a2b2c"}}>
                    <div className="article-inner">
                        <div style={{paddingTop:"15px"}}><span style={{textTransform: "uppercase"}}>Dec 1 • 1 Min Read</span></div>
                        <div style={{fontWeight: "bold"}}>BTN'S 2022 Travel Manager of the Year Award Show Value of NDC</div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3" style={{color: "#2a2b2c"}}>
                <div className="article-outer" style={{borderTop: "1px solid #2a2b2c"}}>
                    <div className="article-inner">
                        <div style={{paddingTop:"15px"}}><span style={{textTransform: "uppercase"}}>Dec 1 • 1 Min Read</span></div>
                        <div style={{fontWeight: "bold"}}>BTN'S 2022 Travel Manager of the Year Award Show Value of NDC</div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3" style={{color: "#2a2b2c"}}>
                <div className="article-outer" style={{borderTop: "1px solid #2a2b2c"}}>
                    <div className="article-inner">
                        <div style={{paddingTop:"15px"}}> <span style={{textTransform: "uppercase", paddingLeft:"5px"}}>Dec 1 </span> • <span style={{textTransform: "uppercase", paddingRight: "5px"}}> 1 Min Read</span></div>
                        <div style={{fontWeight: "bold"}}>BTN'S 2022 Travel Manager of the Year Award Show Value of NDC</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}