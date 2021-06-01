import React from "react";

import "../../css/about.css";

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

class About extends React.Component {
    render() {
        return (
            <div className="about-grid">
                <div className="about d-grid" style={{gap: "1.5rem"}}>
                    <div className="box">
                        <h4>About</h4>
                        <hr />
                        <ul>
                            <li><i>Tom Aarsen</i></li>
                            <li><i>Age</i></li>
                            <li><i>Country</i></li>
                        </ul>
                    </div>

                    <div className="box">
                        <h5>Education</h5>
                        <hr />
                        <ul>
                            <li><i>Education 1...</i></li>
                            <li><i>Education 2...</i></li>
                            <li><i>Education 3...</i></li>
                        </ul>
                    </div>

                    <div className="box">
                        <h5>Links</h5>
                        <hr />
                        <ul>
                            <li><i>Email Link</i></li>
                            <li><i>GitHub Link</i></li>
                            <li><i>LinkedIn Link</i></li>
                        </ul>
                    </div>
                </div>

                {/* <div className="box card">
                    <h4>Skills</h4>
                    <hr />
                    <i>Primarily Python, bla bla, <br />I like programming, bla bla</i>
                    <div className="h-100" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", paddingTop: "0.75rem"}}>
                        <div style={{borderTop: "1px solid #ced4da", borderRight: "1px solid #ced4da"}}>
                            <div style={{paddingTop: "0.75rem", paddingRight: "0.75rem"}}>
                                <h5>Languages</h5>
                                <ul>
                                    <li><i>Language 1...</i></li>
                                    <li><i>Language 2...</i></li>
                                    <li><i>Language 3...</i></li>
                                    <li><i>Language 4...</i></li>
                                    <li><i>Language 5...</i></li>
                                    <li><i>Language 6...</i></li>
                                </ul>
                            </div>
                        </div>

                        <div style={{borderTop: "1px solid #ced4da", borderRight: "1px solid #ced4da"}}>
                            <div style={{paddingTop: "0.75rem", paddingRight: "0.75rem"}}>
                                <h5>Tools</h5>
                                <ul>
                                    <li><i>Tool 1...</i></li>
                                    <li><i>Tool 2...</i></li>
                                    <li><i>Tool 3...</i></li>
                                    <li><i>Tool 4...</i></li>
                                    <li><i>Tool 5...</i></li>
                                    <li><i>Tool 6...</i></li>
                                </ul>
                            </div>
                        </div>

                        <div style={{borderTop: "1px solid #ced4da"}}>
                            <div style={{paddingTop: "0.75rem", paddingRight: "0.75rem"}}>
                                <h5>Work</h5>
                                <ul>
                                    <li><i>Work 1...</i></li>
                                    <li><i>Work 2...</i></li>
                                    <li><i>Work 3...</i></li>
                                    <li><i>Work 4...</i></li>
                                    <li><i>Work 5...</i></li>
                                    <li><i>Work 6...</i></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="box skills">
                    <h4>Skills</h4>
                    <hr />
                    <i>Primarily Python, bla bla, <br />I like programming, bla bla</i>
                </div>

                <div className="box languages">
                    <h5>Languages</h5>
                    {/* <div className="text-muted">A non-complete of languages which I have used over the years.</div> */}
                    <hr />
                    {/* <ul>
                        <li><i>Language 1...</i></li>
                        <li><i>Language 2...</i></li>
                        <li><i>Language 3...</i></li>
                        <li><i>Language 4...</i></li>
                        <li><i>Language 5...</i></li>
                        <li><i>Language 6...</i></li>
                    </ul> */}
                    {/* <table style={{width: "100%"}}>
                        <tbody>
                            <DotsRow name="Python" nStars="5" />
                            <DotsRow name="HTML" nStars="5" />
                            <DotsRow name="JavaScript" nStars="4" />
                            <DotsRow name="CSS" nStars="5" />
                            <DotsRow name="Java" nStars="3" />
                        </tbody>
                    </table> */}
                    <ul>
                        {/* Main */}
                        <li>Python</li>
                        {/* Web */}
                        <li>HTML</li>
                        <li>JavaScript</li>
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
                        <li>Markdown</li>
                        <li>LaTeX</li>
                        <li>RST</li>
                        {/* Proof */}
                        <li>Coq</li>
                        
                        <li>Assembly</li>
                    </ul>
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

                <div className="box tools">
                    <h5>Tools</h5>
                    <hr />
                    <ul>
                        {/* "Skills" */}

                        {/* MongoDB, SQLite, git, React, Linux, Windows, Scrum */}
                        <li><i>Tool 1...</i></li>
                        <li><i>Tool 2...</i></li>
                        <li><i>Tool 3...</i></li>
                        <li><i>Tool 4...</i></li>
                        <li><i>Tool 5...</i></li>
                        <li><i>Tool 6...</i></li>
                    </ul>
                </div>

                <div className="box work">
                    <h5>Work</h5>
                    <hr />
                    <ul>
                        <li><i>Work 1...</i></li>
                        <li><i>Work 2...</i></li>
                        <li><i>Work 3...</i></li>
                        <li><i>Work 4...</i></li>
                        <li><i>Work 5...</i></li>
                        <li><i>Work 6...</i></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default About;
