import React, { useState } from 'react';
//import TableauReport from 'tableau-react';
import "./Protocolsandstudies.css";

const Protocolsandstudies = () => {
    const[button1Shadow, setButton1Shadow] = useState("0px 0px 0px black");
    const[button2Shadow, setButton2Shadow] = useState("0px 0px 0px black");
    const[button3Shadow, setButton3Shadow] = useState("0px 0px 0px black");
    const[button4Shadow, setButton4Shadow] = useState("0px 0px 0px black");
    return(
        <div className="App">
            {/* <h1 style={{padding: 20}}><strong>More Projects</strong></h1>
            <p>Project data is provided in the Tableau project below.</p>
            <body style={{padding: 20}}>
                <TableauReport url="https://public.tableau.com/shared/WG32P77P8?:display_count=y&:origin=viz_share_link" />
            </body> */}
             <h1 style={{padding: 20}}><strong>Protocols and Studies</strong></h1>
             <div style={{alignContent: "flex-start"}}>
                <p style={{marginLeft: 40, marginRight: 40}}>The protocols and studies are linked below. The content is subject to change as the research project is ongoing.</p>
                <div className = "protocol-button-container">
                    <div className = "protocol-button" style={{boxShadow: button1Shadow, cursor: "pointer"}}
                    onMouseOver = {() => {
                        setButton1Shadow("2px 4px 6px gray")
                    }}
                    onMouseLeave = {() => {
                        setButton1Shadow("0px 0px 0px black")
                    }}
                    onClick = {() => {
                        window.open("https://hemanshakerilab.herokuapp.com/Wastewater")
                    }}
                    >
                        <img style={{height: 200, borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}} src="data:image/png;base64,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"/>
                        <strong style={{margin: 20}}>Read the Studies</strong>
                    </div>
                    <div className = "protocol-button"
                    style={{boxShadow: button2Shadow, cursor: "pointer"}}
                    onMouseOver = {() => {
                        setButton2Shadow("2px 4px 6px gray")
                    }}
                    onMouseLeave = {() => {
                        setButton2Shadow("0px 0px 0px black")
                    }}
                    onClick = {() => {
                        window.open("https://hemanshakerilab.herokuapp.com/Wastewater")
                    }}
                    >
                        <img style={{height: 200, borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}} src="https://news.virginia.edu/sites/default/files/article_image/wastewater_analysis_ss_header_1.jpg"/>
                        <strong style={{margin: 20}}>Sample Selection and Collection</strong>
                    </div>
                    <div className = "protocol-button"
                    style={{boxShadow: button3Shadow, cursor: "pointer"}}
                    onMouseOver = {() => {
                        setButton3Shadow("2px 4px 6px gray")
                    }}
                    onMouseLeave = {() => {
                        setButton3Shadow("0px 0px 0px black")
                    }}
                    onClick = {() => {
                        window.open("https://hemanshakerilab.herokuapp.com/Wastewater")
                    }}
                    >
                        <img style={{height: 200, borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}} src="https://yalecovidwastewater.com/protocols/rna.jpeg"/>
                        <strong style={{margin: 20}}>RNA Extraction</strong>
                    </div>
                    <div className = "protocol-button"
                    style={{boxShadow: button4Shadow, cursor: "pointer"}}
                    onMouseOver = {() => {
                        setButton4Shadow("2px 4px 6px gray")
                    }}
                    onMouseLeave = {() => {
                        setButton4Shadow("0px 0px 0px black")
                    }}
                    onClick = {() => {
                        window.open("https://hemanshakerilab.herokuapp.com/Wastewater")
                    }}
                    >
                        <img style={{height: 200, borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}} src="https://yalecovidwastewater.com/protocols/qpcr.png"/>
                        <strong style={{margin: 20}}>Analysis</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Protocolsandstudies; 