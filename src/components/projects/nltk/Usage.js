import React from "react";
import Sunburst from 'react-plotly.js';

import { postJson } from "../../../js/utils.js";

class Usage extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,

            ids: [],
            labels: [],
            parents: [],
            values: []
        };
    }

    componentDidMount() {
        postJson("/api/usage").then(response => {
            this.setState(response);
        })
    }

    render() {
        return (
            <div className="box" style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>Usage distribution of the Natural Language Toolkit (NLTK)</div>
                <Sunburst
                    data={[
                        {
                            ids: this.state.ids,
                            labels: this.state.labels,
                            parents: this.state.parents,
                            values: this.state.values,
                            branchvalues: "total",
                            insidetextorientation: "radial",
                            maxdepth: 4,
                            type: "sunburst",
                        },
                    ]}
                    layout={
                        {
                            margin: {
                                l: 0,
                                r: 0,
                                b: 25,
                                t: 25,
                            },
                        }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        );
    }
}

export default Usage;