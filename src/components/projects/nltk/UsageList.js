import React from "react";

import { postJson } from "../../../js/utils.js";

class UsagePlot extends React.Component {

    constructor() {
        super();
        this.state = {
            uses: []
        };
    }

    componentDidMount() {
        postJson("/api/nltk/usage/list").then(response => {
            this.setState({ uses: response });
        });
    }

    render() {
        return (
            <div className="box" style={{ maxHeight: "100%", overflowY: "auto" }}>
                <div style={{ textAlign: "center" }}>Cumulative usage of objects from the Natural Language Toolkit (NLTK)</div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" style={{ width: "100%" }} >
                                Object
                            </th>
                            <th scope="col">
                                Usage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.uses.map(obj_tuple => {
                            // obj_tuple is (obj, occ)
                            return <tr>
                                <td>
                                    <span className="input-group-text code">{obj_tuple[0]}</span>
                                </td>
                                <td>
                                    <input className="code" type="text" value={obj_tuple[1]} size="7" aria-label="Occurrence" readOnly />
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UsagePlot;