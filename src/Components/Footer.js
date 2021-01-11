import React from 'react';
import "./Footer.css"; 
import { MdEmail } from "react-icons/md";
import { AiFillTwitterSquare, AiFillLinkedin, AiFillGithub, AiFillPhone } from "react-icons/ai";
import { SiGooglescholar, SiOrcid, SiGithub } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";
import dataScienceLogo from "./images/dataScienceLogo.jpg"; 

const Footer = () => {
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="list-unstyled">
                            <li>Questions? Contact Heman Shakeri, Assistant Professor, School of Data Science | University of Virginia</li>
                            <li>
                                <MdEmail size={20}/>
                                <a style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"mailto:" + "hs9hd@virginia.edu"}>Email</a>
                            </li>
                            <li>
                                <AiFillTwitterSquare size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://twitter.com/HemanShakeri"}>Twitter</a>
                            </li>
                            <li>
                                <AiFillLinkedin size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://www.linkedin.com/in/heman-shakeri-61ba603a/"}>LinkedIn</a>
                            </li>
                            <li>
                                <SiGithub size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://github.com/hshakeri"}>Github</a>
                            </li>
                            <li>
                                <SiGooglescholar size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://scholar.google.com/citations?user=zFIIhGMAAAAJ&hl=en"}>Google Scholar</a>
                            </li>
                            <li>
                                <SiOrcid size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://orcid.org/0000-0002-9891-5748"}>ORCID</a>
                            </li>
                            <li>
                                <CgWebsite size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://hemanshakerilab.herokuapp.com/"}>Shakeri Lab Website</a>
                            </li>
                            <li style={{marginTop: 30}}>Site built by Noah Beamon</li>
                            <li>
                                <AiFillLinkedin size={20}/>
                                <a target="_blank" style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"https://www.linkedin.com/in/noah-b-8a45711b5/"}>Noah Beamon</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-unstyled">
                           <li>School of Data Science</li>
                           <li>P.O. Box 400249</li>
                           <li>Charlottesville, VA 22904 USA</li>
                           <li>
                                <a target="_blank" style={{color: 'rgba(85, 85, 85, 1)'}} href={"https://www.google.com/maps/place/Dell+1,+Charlottesville,+VA+22903/@38.0344626,-78.5108793,17z"}>View on Map</a>
                            </li>
                            <li>
                                <MdEmail size={20}/>
                                <a style={{margin: 10, color: 'rgba(85, 85, 85, 1)'}} href={"mailto:" + "datascience@virginia.edu"}>Email</a>
                            </li>
                            <li>
                                <AiFillPhone size={20} style={{marginRight: 10}}/>
                                (434) 982-2600
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="list-unstyled">
                            <li><img style={{width: 375, height: 75}} src={dataScienceLogo}/></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy; 2020-{new Date().getFullYear()} University of Virginia Wastewater Tracker
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer; 