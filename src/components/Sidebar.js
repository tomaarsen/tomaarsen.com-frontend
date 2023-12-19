import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import { NavLink } from "react-router-dom";

import "../css/sidebar.css";

class Sidebar extends React.Component {
    render() {

        // Get a sorted list of repositories, excluding forks and "nltk"
        let sortedRepos = this.props.repos.sort((a, b) => {
            if (a.fork && !b.fork) {
                return -1;
            }
            if (!a.fork && b.fork) {
                return 1;
            }
            return b.size - a.size;
        }).filter(repo => !repo.fork || ["nltk", "nltk_theme"].includes(repo.name))
            .filter(repo => repo.name !== "Binance-Portfolio-Reallocation-Showcase");
        // Filter out Forks, except nltk and nltk_theme

        return (
            <div className="sidebar box">
                <div className="projects-header">Projects</div>
                <ul className="list-group list-group-flush">
                    {/* All projects (cards) */}
                    <li className="list-group-item"><NavLink className="dark" exact to="/projects">Overview</NavLink></li>

                    {/* Sentence-Transformers */}
                    <li className="list-group-item sidebar-list">
                        <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#sentence-transformers-collapse"
                            aria-expanded="true">
                            SentenceTransformers
                        </button>
                        <div className="collapse show" id="sentence-transformers-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                <li><NavLink className="dark" exact to="/projects/sentence-transformers">Description</NavLink></li>
                                <li><a href="https://huggingface.co/models?library=sentence-transformers" target="_blank" rel="noreferrer" className="dark rounded">Models<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                <li><a href="https://sbert.net" target="_blank" rel="noreferrer" className="dark rounded">Documentation<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                <li><NavLink className="dark" exact to="/projects/usage">Metrics</NavLink></li>
                            </ul>
                        </div>
                    </li>

                    {/* SetFit */}
                    <li className="list-group-item sidebar-list">
                        <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#setfit-collapse"
                            aria-expanded="true">
                            🤗 SetFit
                        </button>
                        <div className="collapse show" id="setfit-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                <li><NavLink className="dark" exact to="/projects/setfit">Description</NavLink></li>
                                <li><a href="https://huggingface.co/models?library=setfit" target="_blank" rel="noreferrer" className="dark rounded">Models<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                <li><a href="https://huggingface.co/docs/setfit" target="_blank" rel="noreferrer" className="dark rounded">Documentation<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                <li><NavLink className="dark" exact to="/projects/usage">Metrics</NavLink></li>
                            </ul>
                        </div>
                    </li>

                    {/* SpanMarker */}
                    <li className="list-group-item sidebar-list">
                        <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#spanmarker-collapse"
                            aria-expanded="true">
                            SpanMarker
                        </button>
                        <div className="collapse show" id="spanmarker-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                <li><NavLink className="dark" exact to="/projects/SpanMarkerNER">Description</NavLink></li>
                                <li><a href="https://huggingface.co/models?library=span-marker" target="_blank" rel="noreferrer" className="dark rounded">Models<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                <li><a href="https://tomaarsen.github.io/SpanMarkerNER" target="_blank" rel="noreferrer" className="dark rounded">Documentation<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                <li><NavLink className="dark" exact to="/projects/usage">Metrics</NavLink></li>
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
                                <li><a href="/projects/inflex/paper/inflex_v2.0.pdf" target="_blank" className="dark rounded">Paper<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a></li>
                                {/* <li><NavLink className="dark" exact to="/projects/inflex/paper">Paper</NavLink></li> */}
                                <li><NavLink className="dark" exact to="/projects/inflex/try">Try</NavLink></li>
                                {/* <li><NavLink className="dark" exact to="/projects/inflex/performance">Performance</NavLink></li> */}
                            </ul>
                        </div>
                    </li>

                    {/* This Website */}
                    <li className="list-group-item sidebar-list">
                        <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#website-collapse"
                            aria-expanded="true">
                            tomaarsen.com
                        </button>
                        <div className="collapse show" id="website-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                <li><NavLink className="dark" exact to="/projects/tomaarsen.com-frontend">Frontend</NavLink></li>
                                <li><NavLink className="dark" exact to="/projects/tomaarsen.com-backend">Backend</NavLink></li>
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
                                {sortedRepos
                                    .filter(repo => repo.name.startsWith("Twitch"))
                                    .map(repo => <li key={repo.id}>
                                        <NavLink className="dark" exact to={`/projects/${repo.name}`}>{repo.name}</NavLink>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </li>

                    {/* Miscellaneous */}
                    <li className="list-group-item sidebar-list">
                        <button className="btn btn-toggle align-items-center rounded collapsed"
                            data-bs-toggle="collapse" data-bs-target="#misc-collapse"
                            aria-expanded="true">
                            Miscellaneous
                        </button>
                        <div className="collapse show" id="misc-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal">
                                {sortedRepos
                                    .filter(repo => repo.name !== "Inflex" && repo.name !== "nltk" && !repo.name.startsWith("Twitch") && !repo.name.startsWith("tomaarsen.com-"))
                                    .map(repo => {
                                        return (
                                            <li key={repo.id}>
                                                <NavLink className="dark" exact to={`/projects/${repo.name}`}>{repo.name}</NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;