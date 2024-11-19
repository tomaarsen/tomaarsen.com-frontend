import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

import "../../css/about.css";

class About extends React.Component {
    render() {
        return (
            <div className="about-grid">
                <div className="about box">
                    <h5>About</h5>
                    <hr />
                    Hello,<br /><br />
                    I'm Tom Aarsen - a Machine Learning Engineer based in the Netherlands.
                    I'm best described as a Python enthusiast with a passion for modern <a className="no-bottom-line" href="https://en.wikipedia.org/wiki/Natural_language_processing">NLP</a> and open source development.
                    <hr />

                    I'm a core maintainer of <a className="no-bottom-line" href="https://github.com/UKPLab/sentence-transformers">Sentence Transformers</a>, the de-facto Python framework for state-of-the-art sentence and text embeddings,
                    as well as 🤗 <a className="no-bottom-line" href="https://github.com/huggingface/setfit">SetFit</a>, a promising framework for few-shot text classification using Sentence Transformers.
                    Furthermore, I maintain <a className="no-bottom-line" href="https://github.com/nltk/nltk">NLTK</a>, a foundational Python library for various NLP tasks.

                    <hr />
                    Beyond maintaining projects, I've authored dozens of projects including <NavLink className="no-bottom-line" exact to="/projects/SpanMarkerNER">SpanMarker</NavLink> for
                    state-of-the-art Named Entity Recognition, <NavLink className="no-bottom-line" exact to="/projects/SpanMarkerNER">attention_sinks</NavLink> for
                    extending the fluency of pretrained LLMs, <NavLink className="no-bottom-line" exact to="/projects/inflex">Inflex</NavLink>, a
                    rule-based morphological analyser and generator, and <NavLink className="no-bottom-line" exact to="/projects/module_dependencies">module_dependencies</NavLink> to
                    gather and plot usage metrics of specific functions from public Python libraries.
                </div>

                <div className="links box">
                    <h5>Links</h5>
                    <hr />
                    Find me through one of the links below:
                    <ul style={{ paddingTop: "10px", marginBottom: "0px" }}>
                        <li>
                            <a className="no-bottom-line" href="https://www.github.com/tomaarsen" target="_blank" rel="noopener noreferrer">
                                My GitHub
                                <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                            </a>
                        </li>
                        <li>
                            <a className="no-bottom-line" href="https://huggingface.co/tomaarsen" target="_blank" rel="noopener noreferrer">
                                My Hugging Face
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
                            <NavLink className="no-bottom-line" exact to="/projects/usage">
                                Usage metrics for Sentence Transformers, SetFit and SpanMarker
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/setfit">
                                Few-Shot Text Classification
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/SpanMarkerNER">
                                State-of-the-art Named Entity Recognition
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="no-bottom-line" exact to="/projects/attention_sinks">
                                Extend existing LLMs way beyond the original sequence length with constant memory usage, without retraining
                            </NavLink>
                        </li>
                    </ul>
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
                    <ul style={{ marginBottom: "0px" }}>
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
