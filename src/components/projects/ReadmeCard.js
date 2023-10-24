import React from "react";
import { Link } from "react-router-dom";

const ReadmeCard = ({ name, description, fork, language, stargazers_count, forks_count, html_url, stargazers_url, forks_url, created_at, updated_at, ...props }) => {
    // TODO: Show `full_name`, `description`, `fork` (boolean), `language`, `stargazers_count`, `forks_count`
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const epoch = Date.parse(created_at);
    const date = new Date(epoch);
    const day = date.getDate();

    const dateSuffixes = {
        1: "st", // 1st
        2: "nd", // 2nd
        3: "rd", // 3rd
        21: "st", // 21st
        22: "nd", // 22nd
        23: "rd", // 23rd
        31: "th", // 31st
    };
    const { day: suffix = "th" } = dateSuffixes;

    // in miliseconds
    const units = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: 24 * 60 * 60 * 1000 * 365 / 12,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
    };

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const getRelativeTime = (d1, d2 = new Date()) => {
        var elapsed = d1 - d2;

        // "Math.abs" accounts for both "past" & "future" scenarios
        for (var u in units)
            if (Math.abs(elapsed) > units[u] || u === 'second')
                return rtf.format(Math.round(elapsed / units[u]), u);
    }

    // Hardcode linking to the parent repository for NLTK, SetFit and SentenceTransformers
    if (name === "nltk") {
        html_url = html_url.replace("tomaarsen", "nltk");
    }
    if (name === "setfit") {
        html_url = html_url.replace("tomaarsen", "huggingface");
    }
    if (name === "sentence-transformers") {
        html_url = html_url.replace("tomaarsen", "UKPLab");
    }

    return (
        <div className="readme-card card">

            <Link to={{ pathname: html_url }} target="_blank" className="card-header no-bottom-line">
                <div>
                    <h5>{name}</h5>
                    <em className="text-muted" style={{ float: "right", fontSize: ".75em" }}>{fork ? "Contributed to" : "Original Work"}</em>
                </div>
            </Link>

            <div className="card-body">
                <p className="card-text">
                    This page contains information on my {name} project.<br />
                    <em className="text-muted">Click the header above to visit the repository on GitHub.</em>
                </p>
                <ul className="list-group list-group-horizontal flex-wrap card-body-bar" >
                    <li className="list-group-item text-muted fg-inf"><em>Primarily written in {language}</em></li>
                    <li className="list-group-item text-muted fg-1"><em>Last edited {getRelativeTime(+new Date(updated_at))}</em></li>
                    <li className="list-group-item text-muted fg-1"><em>Created on {months[date.getMonth()]} {day}{suffix} {date.getFullYear()}</em></li>
                    {/* <li className="list-group-item"><img src="../eye.svg" alt="Watchers" /> {subscribers_count}</li> */}
                    <li className="list-group-item fg-1"><img src="../star.svg" alt="Stars" />{stargazers_count}</li>
                    <li className="list-group-item fg-1"><img src="../fork.svg" alt="Forks" />{forks_count}</li>
                </ul>
            </div>
        </div>
    )
}

export default ReadmeCard;