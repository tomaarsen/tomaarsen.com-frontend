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
                <table className="table" style={{ maxWidth: "100%", tableLayout: "fixed" }}>
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">
                                Object
                            </th>
                            <th scope="col" style={{ width: "6rem" }}>
                                Usage
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.uses.map(obj_tuple => {
                            // obj_tuple is (obj, occ)
                            return <tr key={obj_tuple[0]}>
                                <td style={{ overflowX: "auto" }}>
                                    <div className="input-group-text code" style={{ overflowX: "auto" }} >{obj_tuple[0]}</div>
                                </td>
                                <td>
                                    <input style={{ padding: "0.375rem 0.5rem;", backgroundColor: "white" }} className="form-control code" type="text" value={obj_tuple[1]} size="6" aria-label="Occurrence" readOnly />
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