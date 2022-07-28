import React from "react";
import showdown from "showdown";
import ReactHtmlParser from 'react-html-parser';

import ReadmeCard from "./ReadmeCard";
import { useQuery } from "react-query";

import "../../css/readme.css";

const CONVERTER = new showdown.Converter(
    {
        tables: true,
        tasklists: true,
        simplifiedAutoLink: true,
        ghMentions: true,
        openLinksInNewWindow: true,
        splitAdjacentBlockquotes: true
    });
CONVERTER.setFlavor('github');

function Readme(props) {
    let { isLoading, data } = useQuery([`${props.repo.full_name}Readme`], () =>
        fetch(`https://raw.githubusercontent.com/${props.repo.full_name}/${props.repo.default_branch}/README.md`)
            .then(res => res.text())
    )
    if (isLoading) {
        data = "";
    }

    let htmlMarkdown = (
        "<div class='box'>"
        + CONVERTER.makeHtml(data)
            .replaceAll("<hr />", "</div><div class='box'>")
        // .replaceAll("<hr />", "")
        // .replaceAll("<h1 ", "</div><div class='box'><h1 ")
        // .replaceAll("<h2 ", "</div><div class='box'><h2 ")
        // .replaceAll("<h3 ", "</div><div class='box'><h3 ")
        // .replaceAll("<pre>\n", "<pre>")
        // .replaceAll("<br><br>", "<br>")
        + "</div>"
    )

    return (
        <div className="row-grid">
            <ReadmeCard {...props.repo}></ReadmeCard>
            {ReactHtmlParser(htmlMarkdown)}
        </div>
    )
}

// TODO: Add papers of SPLCompiler

export default Readme;