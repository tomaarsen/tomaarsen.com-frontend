
import React from "react";

import OverviewCard from "./OverviewCard";

import "../../css/overview.css";

class Overview extends React.Component {
    render() {
        const repositories = this.props.repos
            // .filter(repo => !repo.fork)
            // .sort((a, b) => b.size - a.size)
            .sort((a, b) => {
                if (a.fork && !b.fork)
                    return 1;
                else if (!a.fork && b.fork)
                    return -1;
                return b.size - a.size;
            })
            .map(rep => <OverviewCard key={rep.id} {...rep} />);

        return (
            <div className="overview-wrapper">
                {repositories}
            </div>
        )
    }
}

export default Overview