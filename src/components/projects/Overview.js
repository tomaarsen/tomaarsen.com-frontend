
import React from "react";

import OverviewCard from "./OverviewCard";

import "../../css/overview.css";

class Overview extends React.Component {
    render() {
        const repositories = this.props.repos.filter(repo => !repo.fork)
            .sort((a, b) => b.size - a.size)
            .map(rep => <OverviewCard key={rep.id} {...rep} />);

        return (
            <div className="overview-wrapper">
                {repositories}
            </div>
        )
    }
}

export default Overview