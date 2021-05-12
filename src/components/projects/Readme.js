import React from "react";
import showdown from "showdown";
import ReactHtmlParser from 'react-html-parser';

import ReadmeCard from "./ReadmeCard";

import "../../css/readme.css";

class Readme extends React.Component {

    constructor() {
        super();
        this.converter = new showdown.Converter(
            {
                tables: true,
                tasklists: true,
                simplifiedAutoLink: true,
                ghMentions: true,
                openLinksInNewWindow: true,
                splitAdjacentBlockquotes: true
            });
        this.converter.setFlavor('github');
        this.state = {
            convertedMarkdown: ""
        };
    }

    componentDidMount() {
        // TODO: Cache this API call
        fetch(`https://raw.githubusercontent.com/${this.props.repo.full_name}/${this.props.repo.default_branch}/README.md`)
            .then(r => r.text())
            .then(r => {console.log(r); return r})
            .then(r => this.setState({
                convertedMarkdown:
                    "<div class='box'>" +
                    this.converter.makeHtml(r)
                        .replaceAll("<hr />", "</div><div class='box'>")
                        // .replaceAll("<hr />", "")
                        // .replaceAll("<h1 ", "</div><div class='box'><h1 ")
                        // .replaceAll("<h2 ", "</div><div class='box'><h2 ")
                        // .replaceAll("<h3 ", "</div><div class='box'><h3 ")
                        .replaceAll("<pre>\n", "<pre>")
                    // .replaceAll("<br><br>", "<br>")
                    +
                    "</div>"
            }));
    }

    render() {
        return (
            <div className="row-grid">
                <ReadmeCard {...this.props.repo}></ReadmeCard>
                { ReactHtmlParser(this.state.convertedMarkdown)}
            </div>
        )
    }
}

// TODO: Fix links to code files (TTSTextNormalization)

export default Readme;