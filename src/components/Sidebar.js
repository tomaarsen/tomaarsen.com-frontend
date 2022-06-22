import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import {
    NavLink,
} from "react-router-dom";

class Sidebar extends React.Component {
    render() {

        let sortedRepos = this.props.repos.sort((a, b) => {
            if (a.fork && !b.fork) {
                return -1;
            }
            if (!a.fork && b.fork) {
                return 1;
            }
            return b.size - a.size;
        })
            .filter(repo => !repo.fork || repo.name === "nltk");

        return (
            <div className="sidebar box">
                <div className="accordion accordion-flush" id="sidebar">

                    <div className="accordion-item">
                        <h2 className="accordion-header collapsed" id="projects-header">
                            <button className="accordion-button" type="button" aria-expanded="true">
                                Projects
                            </button>
                        </h2>

                        <div id="projects-collapse" className="accordion-collapse collapse show" aria-labelledby="projects-header">
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
                                                {/* <li><NavLink className="dark" exact to="/projects/inflex/paper">Paper</NavLink></li> */}
                                                <li><a href="/projects/inflex/paper/inflex_v2.0.pdf" target="_blank" className="link-dark rounded">Paper<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                                {/* <li><NavLink className="dark" exact to="/projects/inflex/paper">Paper</NavLink></li> */}
                                                <li><NavLink className="dark" exact to="/projects/inflex/try">Try</NavLink></li>
                                                <li><NavLink className="dark" exact to="/projects/inflex/performance">Performance</NavLink></li>
                                            </ul>
                                        </div>
                                    </li>

                                    {/* NLTK */}
                                    <li className="list-group-item sidebar-list">
                                        <button className="btn btn-toggle align-items-center rounded collapsed"
                                            data-bs-toggle="collapse" data-bs-target="#nltk-collapse"
                                            aria-expanded="true">
                                            NLTK
                                        </button>
                                        <div className="collapse show" id="nltk-collapse">
                                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                                <li><NavLink className="dark" exact to="/projects/nltk">Description</NavLink></li>
                                                <li><NavLink className="dark" exact to="/projects/nltk/usage/plot">Usage Plot</NavLink></li>
                                                <li><NavLink className="dark" exact to="/projects/nltk/usage/list">Usage List</NavLink></li>
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

                                    {sortedRepos.filter(repo => repo.name !== "Inflex" && repo.name !== "nltk" && !repo.name.startsWith("Twitch"))
                                        .map(repo => {
                                            return (
                                                <li key={repo.id} className="list-group-item"><NavLink className="dark" exact to={`/projects/${repo.name}`}>{repo.name}</NavLink></li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;