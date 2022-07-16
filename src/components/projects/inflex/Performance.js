import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import { Helmet } from "react-helmet";

import "../../../css/performance.css";
import "../../../css/form.css";
import "../../../css/chart.css";

import Chart from "./PerformanceChart";

import { postJson } from "../../../js/utils.js";

class Performance extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,

            pos: "n",
            wordform: "sing",
            source: "celex_word",

            labels: [],
            performance: {},
            nTerms: 0
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
            "a": ["comp", "super"],
        };

        this.startLoading = this.startLoading.bind(this);
        this.postPerformance = this.postPerformance.bind(this);
        this.toggleWordformDisabled = this.toggleWordformDisabled.bind(this);
        this.handlePos = this.handlePos.bind(this);
        this.handleWordform = this.handleWordform.bind(this);
        this.handleSource = this.handleSource.bind(this);
    }

    startLoading() {
        this.setState({ loading: true });
    }

    postPerformance() {
        this.startLoading();
        postJson("/api/performance", {
            'pos': this.state.pos,
            'wordform': this.state.wordform,
            'source': this.state.source,
        }).then(response => {
            this.setState({
                labels: response.labels,
                performance: response.performance,
                nTerms: response.n_terms,
                loading: false
            });
        });
    }

    toggleWordformDisabled() {
        // If one of the wordforms that will be disabled has been selected, reset to the first legal option
        if (!this.posToWordforms[this.state.pos].includes(this.state.wordform)) {
            this.setState({ wordform: this.posToWordforms[this.state.pos][0] }, this.postPerformance);
        } else {
            this.postPerformance();
        }
    }

    handlePos(event) {
        if (this.state.pos !== event.target.value) {
            this.setState({ pos: event.target.value }, this.toggleWordformDisabled);
        }
    }

    handleWordform(event) {
        if (this.state.wordform !== event.target.value) {
            this.setState({ wordform: event.target.value }, this.postPerformance);
        }
    }

    handleSource(event) {
        if (this.state.source !== event.target.value) {
            this.setState({ source: event.target.value }, this.postPerformance);
        }
    }

    componentDidMount() {
        this.postPerformance();
    }

    getInfoMessages() {
        // TODO: Give each of these "key" fields
        let messages = [];

        // Info on Data source
        if (this.state.source.startsWith("celex")) {
            messages.push(["Dutch ", <b>Ce</b>, "ntre for ", <b>Lex</b>, "ical Information (CELEX) data is gathered from ",
                <a href="http://celex.mpi.nl">WebCelex</a>, "."]);
        }
        else if (this.state.source.startsWith("agid")) {
            messages.push(
                [<b>A</b>, "utomatically ", <b>G</b>, "enerated ", <b>I</b>, "nflection ", <b>D</b>, "atabase (AGID) data is gathered from ",
                <a href="https://raw.githubusercontent.com/en-wl/wordlist/master/agid/infl.txt">here</a>,
                    ". See Kevin Atkinson's ",
                <a href="http://wordlist.aspell.net/agid-readme/">readme</a>,
                    " for more information."]);
        }
        else if (this.state.source.startsWith("wiktionary")) {
            messages.push(["Wiktionary data is gathered from ",
                <a href="https://kaikki.org/dictionary/English/inflected.html">here</a>,
                ". See ",
                <a href="https://github.com/tatuylonen/wiktextract">here</a>,
                " for more information on wikextract, the tool used to gather this data."
            ]);
        }

        // Info on lack of returning data
        if ((this.state.pos === "n" && this.state.wordform === "sing") ||
            (this.state.pos === "v" && this.state.wordform === "plur")) {
            messages.push(["NLTK and PyInflect returned no output for some test cases. These are counted as incorrect."]);
        }
        else {
            messages.push(["PyInflect returned no output for some test cases. These are counted as incorrect."]);
        }

        // Notify users that PyInflect uses AGID data
        if (this.state.source === "agid") {
            messages.push(["The PyInflect module is built using AGID data. As a result, its good performance as shown here is not indicative of good performance in a real scenario. Try the other data sources for a better indication of PyInflect's performance."]);
        }

        return messages;
    }

    render() {
        const infoMessages = this.getInfoMessages();
        const infoMessagesItems = infoMessages.map((message, i) => <li key={i} className="list-group-item">{message}</li>);
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3">Notes</Popover.Title>
                <Popover.Content>
                    <ul className="list-group list-group-flush">
                        {infoMessagesItems}
                    </ul>
                </Popover.Content>
            </Popover>
        );

        const enabledWordforms = this.posToWordforms[this.state.pos];

        return (
            <div className="performance-wrapper" style={{ overflow: "hidden" }}>
                <Helmet>
                    {/* Imports for Performance tab */}
                    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>
                    <script src="https://cdn.jsdelivr.net/npm/hammerjs@2.0.8"></script>
                    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@v0.7.7"></script>
                </Helmet>
                <div className="box" style={{ position: "relative" }}>
                    <div className="spinner-border" style={{ position: "absolute", right: "1.5rem", opacity: this.state.loading ? 1 : 0 }} />
                    <form id="inflex_form" className="row needs-validation" method="post" noValidate>
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

                        <div className="col-auto">
                            <label htmlFor="data_source" className="form-label">Data Source</label>
                            <select className="form-select" name="data_source" id="data_source" value={this.state.source} onChange={this.handleSource} required>
                                <option value="celex">CELEX</option>
                                <option value="celex_word">CELEX (Words only)</option>
                                <option value="celex_collocation">CELEX (Collocations only)</option>
                                <option value="agid">AGID</option>
                                <option value="wiktionary">Wiktionary</option>
                                <option value="wiktionary_word">Wiktionary (Words only)</option>
                                <option value="wiktionary_collocation">Wiktionary (Collocations only)</option>
                            </select>
                        </div>

                        {infoMessages.length ? <div className="col-auto">
                            <label htmlFor="info" className="form-label">&nbsp;</label>
                            <OverlayTrigger trigger={["focus"]} placement="right" overlay={popover}>
                                <Button id="info" className="d-block" variant="outline-warning"><FontAwesomeIcon icon={faInfo} /></Button>
                            </OverlayTrigger>
                        </div> : null}
                    </form>
                </div>

                <div className="box" style={{ overflow: "hidden" }}>
                    <Chart pos={this.state.pos}
                        wordform={this.state.wordform}
                        labels={this.state.labels}
                        performance={this.state.performance}
                        nTerms={this.state.nTerms} />
                </div>
            </div>
        );
    }
}

// TODO: Remove header on refresh

export default Performance;