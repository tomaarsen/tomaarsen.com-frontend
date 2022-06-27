
import React from "react";
import { Link } from "react-router-dom";

const OverviewCard = ({ name, description, fork, language, stargazers_count, forks_count, stargazers_url, forks_url, ...props }) => {
    // TODO: Show `full_name`, `description`, `fork` (boolean), `language`, `stargazers_count`, `forks_count`
    return (
        <Link to={{ pathname: `/projects/${name}` }} className="dark">
            <div className="repo-card card">
                <div className="card-header">
                    <h5>{name}</h5>
                    <em className="text-muted" style={{ float: "right", fontSize: ".75em" }}>{fork ? "Contributed to" : "Original Work"}</em>
                </div>

                <div className="card-body">
                    <p className="card-text text-muted">{description}</p>
                    <ul className="list-group list-group-horizontal card-body-bar" style={{ alignContent: "stretch" }}>
                        <li className="list-group-item" style={{ flexGrow: 1 }}>{language}</li>
                        <li className="list-group-item"><img src="star.svg" alt="Stars" /> {stargazers_count}</li>
                        <li className="list-group-item"><img src="fork.svg" alt="Forks" />{forks_count}</li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}

export default OverviewCard