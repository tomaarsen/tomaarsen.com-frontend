import React from "react";
import Sunburst from 'react-plotly.js';

import { ids, labels, parents, values } from "./chartValues.js";

class Usage extends React.Component {

    render() {
        return (
            <div className="box" style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>Usage distribution of the Natural Language Toolkit (NLTK)</div>
                <Sunburst
                    data={[
                        {
                            ids: ids,
                            labels: labels,
                            parents: parents,
                            values: values,
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