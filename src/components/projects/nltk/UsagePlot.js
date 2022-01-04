import React from "react";

class UsagePlot extends React.Component {

    render() {
        return (
            <div className="box" style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>Usage distribution of the Natural Language Toolkit (NLTK)</div>
                <embed type="text/html" src="/api/nltk/usage/plot" width="100%" height="100%" /> 
            </div>
        );
    }
}

export default UsagePlot;