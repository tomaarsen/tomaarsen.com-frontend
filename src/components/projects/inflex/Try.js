import React from "react";
import $ from "jquery"; // TODO: Avoid needing this

import "../../../css/form.css";
import "../../../css/try.css";

import Row from "./TryRow";

import { postJson } from "../../../js/utils.js";

class Try extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,

            pos: "n",
            wordform: "sing",
            word: "",
            showCompetitors: "",

            knownCorrects: [],
            answers: []
        };

        this.wordforms = [
            ["sing", "To Singular"],
            ["plur", "To Plural"],
            ["past", "To Past"],
            ["past_part", "To Past Participle"],
            ["pres_part", "To Present Participle"],
            ["comp", "To Comparative"],
            ["super", "To Superlative"]
        ];
        this.posToWordforms = {
            "v": ["sing", "plur", "past", "past_part", "pres_part"],
            "n": ["sing", "plur"],
            "a": ["sing", "plur", "comp", "super"],
        };

        this.startLoading = this.startLoading.bind(this);
        this.postGo = this.postGo.bind(this);
        this.postRandom = this.postRandom.bind(this);
        this.postModules = this.postModules.bind(this);
        this.toggleWordformDisabled = this.toggleWordformDisabled.bind(this)
        this.handleCompetitors = this.handleCompetitors.bind(this);
        this.handleWord = this.handleWord.bind(this);
        this.handlePos = this.handlePos.bind(this);
        this.handleWordform = this.handleWordform.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    startLoading() {
        this.setState({ loading: true });
    }

    normalizeAnswers(answers) {
        // Remove `null` from the server's answers, and replace them with "" instead.
        return answers.map(answer => {
            return {
                ...answer,
                output: answer.output ? answer.output : ""
            }
        });
    }

    postGo() {
        this.startLoading();
        postJson("/api/try/go", {
            'pos': this.state.pos,
            'wordform': this.state.wordform,
            'word': this.state.word,
            'show_competitors': this.state.showCompetitors,
        }).then(response => {
            this.setState({
                knownCorrects: response.known_corrects,
                answers: this.normalizeAnswers(response.answers),
                loading: false
            })
        });
        // We might get an output of null from the server, but we convert that to the empty string
    }

    postModules() {
        this.startLoading();
        postJson("/api/try/modules", {
            'pos': this.state.pos,
            'wordform': this.state.wordform,
            'show_competitors': this.state.showCompetitors,
        }).then(response => {
            this.setState({
                knownCorrects: [],
                answers: response.modules.map(module => {
                    return {
                        "module": module,
                        "output": null,
                    }
                }),
                loading: false
            });
        });
        // We set the output to null so that we can distinguish between an empty output and no output
    }

    postRandom() {
        // Somtimes it doesn't seem to know the known correct?
        this.startLoading();
        postJson("/api/try/random", {
            'show_competitors': this.state.showCompetitors,
        }).then(response => {
            this.setState({
                pos: response.pos,
                wordform: response.wordform,
                word: response.word,
                knownCorrects: response.known_corrects,
                answers: this.normalizeAnswers(response.answers),
                loading: false
            }, () => console.log(this.state));
        });
    }

    toggleWordformDisabled() {
        // If one of the wordforms that will be disabled has been selected, reset to the first legal option
        if (!this.posToWordforms[this.state.pos].includes(this.state.wordform)) {
            this.setState({ wordform: this.posToWordforms[this.state.pos][0] });
        }
    }

    handleCompetitors() {
        // Swap the showCompetitors value, and then either get the result for all modules
        // if word is non-empty, or get the modules to display with postModules() if it is empty.
        this.setState(prevState => {
            return {
                showCompetitors: !prevState.showCompetitors
            }
        }, () => this.state.word.length ? this.postGo() : this.postModules());
        // TODO: Update this so it only calls postGo if it already did that previously, with this word
    }

    handleWord(event) {
        this.setState({ word: event.target.value });
    }

    handlePos(event) {
        this.setState({ pos: event.target.value }, this.toggleWordformDisabled);
    }

    handleWordform(event) {
        this.setState({ wordform: event.target.value });
    }

    handleSubmit(event) {
        this.postGo();
        event.preventDefault();
    }

    componentDidMount() {
        this.postModules();
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevState);
    // }

    render() {

        const rows = this.state.answers.map((answer, i) => {
            return <Row key={i} module={answer.module} output={answer.output} knownCorrects={this.state.knownCorrects} />
        });
        // True if we want to also show the "Known Correct" row.
        const allWrong = this.state.knownCorrects.length > 0 && this.state.answers.every(answer => !this.state.knownCorrects.includes(answer.output));

        const enabledWordforms = this.posToWordforms[this.state.pos];

        return (
            <div className="box">
                <div className="container mw-100" style={{position: "relative"}}>
                    <div className="spinner-border spinner-border-sm" style={{ position: "absolute", right: "1.75rem", opacity: this.state.loading ? 1 : 0 }} />
                    <form id="inflex_form" className="row needs-validation" method="post" noValidate onSubmit={this.handleSubmit}>
                        <div className="col-auto">
                            <label htmlFor="pos" className="form-label">Part of Speech</label>
                            <select className="form-select" name="pos" id="pos" value={this.state.pos} onChange={this.handlePos} required>
                                <option value="n">Noun</option>
                                <option value="v">Verb</option>
                                <option value="a">Adjective</option>
                            </select>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="wordform" className="form-label">Wordform</label>
                            <select className="form-select" name="wordform" id="wordform" value={this.state.wordform} onChange={this.handleWordform} required>
                                {
                                    this.wordforms.map(([wordform, text]) => {
                                        return <option value={wordform} disabled={!enabledWordforms.includes(wordform)}>{text}</option>
                                    })
                                }
                            </select>
                            <div className="invalid-feedback">
                                Please select a valid wordform for this Part of Speech.
                            </div>
                        </div>

                        <div className="col">
                            <label htmlFor="word" className="form-label">Word or Collocation</label>
                            <input type="text" className="form-control long" name="word" id="word" value={this.state.word} placeholder=". . ." onChange={this.handleWord} required />
                            <div className="invalid-feedback">
                                Please provide a word or collocation.
                            </div>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="random" className="form-label">&nbsp;</label>
                            <button type="button" name="random" id="random" className="btn btn-outline-warning d-block" onClick={this.postRandom}>Random</button>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="go" className="form-label">&nbsp;</label>
                            <button type="submit" id="go" className="btn btn-outline-success d-block">Go</button>
                        </div>
                    </form>

                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th id="module_column" scope="col">
                                    Module
                                </th>
                                <th style={{ width: "90%" }} scope="col">
                                    Output
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allWrong && <Row module="Known Correct" output={this.state.knownCorrects[0]} knownCorrects={this.state.knownCorrects} />}
                            {rows}
                        </tbody>
                    </table>

                    <div className="col-auto d-flex justify-content-center background">
                        <button className="btn btn-outline-dark" type="button" id="competitors_button" onClick={this.handleCompetitors}>Show Competitors</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Try;