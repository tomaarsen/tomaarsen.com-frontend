import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import "../../css/about.css";

/*
class DotsRow extends React.Component {
    render() {
        const dots = [...Array(5).keys()].map(i => <img src={i < this.props.nStars ? "dot_filled.svg" : "dot_empty.svg"} alt="Dot" key={i}/>);
        return (
            <tr>
                <td>
                    {this.props.name}
                </td>
                <td style={{textAlign: "right"}}>
                    {dots}
                </td>
            </tr>
        )
    }
}
*/

class About extends React.Component {
    render() {
        return (
            <div className="about-grid">
                <div className="about box">
                    <h5>About</h5>
                    <hr />
                    {/* <ul>
                        <li><i>Tom Aarsen</i></li>
                        <li><i>Age</i></li>
                        <li><i>Country</i></li>
                    </ul> */}
                    {/* Hello. I'm Tom Aarsen, a {moment().diff('1999-12-02', 'years')} year old Programming enthusiast */}
                    Hello,<br /><br />
                    I'm Tom Aarsen - a Master student of the Data Science specialisation in Computing Science, based in the Netherlands.
                    I'm a Python enthusiast, with an interest in <a className="no-bottom-line" href="https://en.wikipedia.org/wiki/Natural_language_processing">NLP</a> and open sourced development.
                    {/* (See also <a className="no-bottom-line" href="https://github.com/pulls?q=is%3Apr+author%3Atomaarsen">my PRs</a>) */}
                    <hr />
                    {/* I'm the author of <NavLink className="no-bottom-line" exact to="/projects/inflex">Inflex</NavLink>, */}
                    {/* and I'm a member of the team behind <a className="no-bottom-line" href="https://github.com/nltk/nltk">NLTK</a>, a well-known NLP Python library boasting over 10k stars on GitHub.<br /> */}
                    I'm a core maintainer of <a className="no-bottom-line" href="https://github.com/nltk/nltk">NLTK</a>, a well-known NLP Python library boasting over 10k stars on GitHub, 
                    and I've authored dozens of projects including <NavLink className="no-bottom-line" exact to="/projects/inflex">Inflex</NavLink> and <NavLink className="no-bottom-line" exact to="/projects/module_dependencies">module_dependencies</NavLink>.<br />
                    <hr />
                    I've also developed well over a dozen Twitch.tv bots, which now run in countless chat rooms. Beyond that, I've completed over half a dozen projects on a freelance basis over the years.
                    <hr />
                    
                    Lastly, I've developed websites (including this one!) from scratch, and have scored well in several Kaggle competitions (<NavLink className="no-bottom-line" exact to="/projects/Hotel-ID-2022">Hotel ID</NavLink>, <NavLink className="no-bottom-line" exact to="/projects/TTSTextNormalization">TTSTextNormalization</NavLink>).
                </div>

                <div className="languages box">
                    <h5>Languages I'm familiar with</h5>
                    {/* <div className="text-muted">A non-complete of languages which I have used over the years.</div> */}
                    <hr />
                    <ul>
                        {/* Main */}
                        <li>Python</li>
                        {/* Web */}
                        <li>HTML</li>
                        <li>JavaScript (incl. jQuery, React)</li>
                        <li>PHP</li>
                        <li>CSS</li>
                        {/* C-likes */}
                        <li>C</li>
                        <li>C++</li>
                        <li>C# (Unity)</li>
                        <li>Java</li>
                        <li>Scala</li>
                        <li>Perl</li>
                        {/* Functional */}
                        <li>Haskell</li>
                        <li>Prolog</li>
                        {/* Query Language */}
                        <li>SQL</li>
                        {/* Formatting */}
                        <li>LaTeX</li>
                        <li>RST</li>
                        {/* <li>Markdown</li> */}
                        {/* Proof */}
                        <li>Coq</li>

                        {/* <li>Assembly</li> */}

                        <li><div className="text-muted">and more...</div></li>
                    </ul>
                    {/* Python, HTML, JavaScript (incl. jQuery, React, etc.), PHP, CSS, C, C++, C# (Unity), Java, Scala, Perl, Haskell, Prolog, SQL, LaTeX, RST, Markdown, CoQ, Assembly */}
                    {/* 
                    Python: 
                        numpy, pandas, Flask
                    
                    JS:
                        JQuery, React

                    Bootstrap
                    
                    Database:
                        SQLite, MongoDB */}
                    {/* Main */}
                    {/* Python (incl. numpy, pandas, Flask, more),  */}
                    {/* Web */}
                    {/* HTML, JavaScript (incl. jQuery, React), CSS, PHP, */}
                    {/* C-likes */}
                    {/* Java, C++, C, C# (Unity), Perl,  */}
                    {/* Functional */}
                    {/* Haskell, Prolog, */}
                    {/* Query Language */}
                    {/* SQL, */}
                    {/* Formatting */}
                    {/* Markdown, LaTeX, RST, */}
                    {/* Proof */}
                    {/* Coq */}
                    {/* Extra? */}
                    {/* XML, JSON, */}
                </div>

                <div className="links box">
                    <h5>Links</h5>
                    <hr />
                    Find me through one of the links below:
                    <ul style={{ paddingTop: "10px", marginBottom: "0px"}}>
                        {/* <li>
                            <i>Email Link</i>
                        </li> */}
                        <li>
                            <a className="no-bottom-line" href="https://www.github.com/tomaarsen" target="_blank" rel="noopener noreferrer">
                                My GitHub
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                            </a>
                        </li>
                        <li>
                            <a className="no-bottom-line" href="https://www.linkedin.com/in/tomaarsen" target="_blank" rel="noopener noreferrer">
                                My LinkedIn
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                            </a>
                        </li>
                        <li>
                            <a className="no-bottom-line" href="https://stackoverflow.com/users/17936326/tom-aarsen" target="_blank" rel="noopener noreferrer">
                                My StackOverflow
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="recommended box">
                    <h5>Recommended pages on this site</h5>
                    <hr />
                    <ul>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/inflex">
                                What is Inflex?
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/inflex/try">
                                Try out Inflex.
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/inflex/performance">
                                Compare Inflex to competitors.
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/nltk">
                                Natural Language Toolkit. (NLTK)
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/nltk/usage/plot">
                                Compare usage of NLTK objects.
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <ul>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/module_dependencies">
                                Determine how frequently functionality of your favourite Python module is used.
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/TTSTextNormalization">
                                Convert from written expressions to spoken form.
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/TheNounProjectAPI">
                                Access the Noun Project icons and photos API.
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <ul style={{marginBottom: "0px"}}>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/TwitchMarkovChain">
                                Try a Twitch chat bot that generates messages based on information it learns dynamically.
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;
