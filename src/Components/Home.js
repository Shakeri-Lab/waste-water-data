import React, { useState } from 'react';
import ReactMd from 'react-md-file';
import "./Home.css"; 

const Home = () => {
    const[button1Color, setButton1Color] = useState("rgba(46, 61, 130, 1)");
    const[button2Color, setButton2Color] = useState("rgba(85, 85, 85, 1)");

    return(
        <div className="App">
                <div className="markdown-img-content" style={{marginRight: 50, marginLeft: 50, marginTop: 90}}>
                    <div style={{marginRight: 30}}>
                        <div>
                            <ReactMd fileName="./HomeParagraph1.md" />
                        </div>
                        <div className="button-container">
                            <div className="button" style={{backgroundColor: button1Color, cursor: "pointer"}}
                            onMouseOver={() =>{
                                setButton1Color("rgba(46, 61, 130, 0.8)");
                            }}
                            onMouseLeave={() =>{
                                setButton1Color("rgba(46, 61, 130, 1)");
                            }}
                            onClick={() =>{
                                window.location.href="Reports";
                                setTimeout(() => {
                                    setButton1Color("rgba(46, 61, 130, 1)");
                                }, 20);
                            }}
                            >
                                <strong style={{color: "white"}}>See Data Reports</strong>
                            </div>
                            <div className="button" style={{backgroundColor: button2Color, cursor: "pointer"}}
                            onMouseOver={() =>{
                                setButton2Color("rgba(85, 85, 85, 0.8)");
                            }}
                            onMouseLeave={() =>{
                                setButton2Color("rgba(85, 85, 85, 1)");
                            }}
                            onClick={() =>{
                                window.location.href="Faq";
                                setTimeout(() => {
                                    setButton2Color("rgba(85, 85, 85, 1)");
                                }, 20);
                            }}
                            >
                                <strong style={{color: "white"}}>FAQs</strong>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft: 30}}>
                            <img style={{borderRadius: 5, width: "40vw", height: "30vw"}} src="https://news.virginia.edu/sites/default/files/article_image/wastewater_analysis_ss_header_0.jpg" />
                            <ReactMd markdown="UVA’s wastewaster testing program officially launched Sept. 8, as the undergraduate student population returned to UVA’s Grounds. (Photo by Sanjay Suchak, University Communications)" />
                    </div>
                </div>
            <div style={{marginLeft: 50, marginRight: 50}}>
                <ReactMd fileName="./HomeParagraph2.md" />
            </div>
        </div>
    )
}

export default Home; 