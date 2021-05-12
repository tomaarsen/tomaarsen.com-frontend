import React from "react";

import {
    NavLink,
} from "react-router-dom";

class Sidebar extends React.Component {
    render() {

        let sortedRepos = this.props.repos.sort((a, b) => {
            if (a.fork && !b.fork) {
                return 1;
            }
            if (!a.fork && b.fork) {
                return -1;
            }
            return b.size - a.size;
        })
        .filter(repo => !repo.fork);

        return (
            <div className="sidebar box">
                <div className="accordion accordion-flush" id="sidebar">

                    <div className="accordion-item">
                        <h2 className="accordion-header collapsed" id="projects-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#projects-collapse" aria-expanded="true" aria-controls="projects-collapse">
                                Projects
                        </button>
                        </h2>

                        <div id="projects-collapse" className="accordion-collapse collapse show" aria-labelledby="projects-header"
                            data-bs-parent="#sidebar">
                            <div className="accordion-body p-0">
                                <ul className="list-group list-group-flush ps-1">
                                    {/* All projects (cards) */}
                                    <li className="list-group-item"><NavLink className="dark" exact to="/projects">Overview</NavLink></li>
                                    
                                    {/* Inflex */}
                                    <li className="list-group-item sidebar-list">
                                        <button className="btn btn-toggle align-items-center rounded collapsed"
                                            data-bs-toggle="collapse" data-bs-target="#inflex-collapse"
                                            aria-expanded="true">
                                            Inflex
                                        </button>
                                        <div className="collapse show" id="inflex-collapse">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                                {/* <li><a href="try" className="link-dark rounded">Try</a></li> */}
                                                {/* <li><a href="performance" className="link-dark rounded">Performance</a></li> */}
                                                <li><NavLink className="dark" exact to="/projects/inflex">Description</NavLink></li>
                                                <li><NavLink className="dark" exact to="/projects/inflex/try">Try</NavLink></li>
                                                <li><NavLink className="dark" exact to="/projects/inflex/performance">Performance</NavLink></li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* Twitch */}
                                    <li className="list-group-item sidebar-list">
                                        <button className="btn btn-toggle align-items-center rounded collapsed"
                                            data-bs-toggle="collapse" data-bs-target="#twitch-collapse"
                                            aria-expanded="false">
                                            Twitch Bots
                                    </button>
                                        <div className="collapse" id="twitch-collapse">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                                {/* <li><NavLink className="dark" exact to="/projects/try">Try</NavLink></li> */}
                                                {sortedRepos.filter(repo => repo.name.startsWith("Twitch"))
                                                .map(repo => <li key={repo.id}><NavLink className="dark" exact to={`/projects/${repo.name}`}>{repo.name}</NavLink></li>)}
                                            </ul>
                                        </div>
                                    </li>

                                    {sortedRepos.filter(repo => repo.name !== "Inflex" && !repo.name.startsWith("Twitch"))
                                        .map(repo => {
                                            return (
                                                <li key={repo.id} className="list-group-item"><NavLink className="dark" exact to={`/projects/${repo.name}`}>{repo.name}</NavLink></li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="skills-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#skills-collapse" aria-expanded="false" aria-controls="skills-collapse">
                                Skills
                        </button>
                        </h2>
                        <div id="skills-collapse" className="accordion-collapse collapse" aria-labelledby="skills-header"
                            data-bs-parent="#sidebar">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to
                            demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion
                            body. Let's imagine this being filled with some actual content.</div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="about-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#about-collapse" aria-expanded="false" aria-controls="about-collapse">
                                About
                        </button>
                        </h2>
                        <div id="about-collapse" className="accordion-collapse collapse" aria-labelledby="about-header"
                            data-bs-parent="#sidebar">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to
                            demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion
                            body. Nothing more exciting happening here in terms of content, but just filling up the
                            space to make it look, at least at first glance, a bit more representative of how this would
                            look in a real-world application.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;