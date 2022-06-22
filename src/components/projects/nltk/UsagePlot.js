import React from "react";

class UsagePlot extends React.Component {

    render() {
        return (
            <div className="box" style={{ height: "100%" }}>
                <div style={{ textAlign: "center" }}>
                    Usage distribution of the Natural Language Toolkit (NLTK)
                    <br />
                    <a style={{ fontSize: 14 }} className="dark" href="/projects/module_dependencies">This graph was generated using my <span className="code">module_dependencies</span> Python module. Click this to find out more.</a>
                </div>
                <embed type="text/html" src="nltk_usage.htm" width="100%" height="97%" />
            </div>
        );
    }
}

export default UsagePlot;