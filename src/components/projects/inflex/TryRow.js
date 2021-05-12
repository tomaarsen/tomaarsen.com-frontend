import React from "react";

class Row extends React.Component {
    // constructor() {
    //     super();
    // }
    
    handleWord(event) {
        return;
    }

    render() {
        let classes = "form-control try-output";
        let value = "";
        console.log(this.props);
        if (!(this.props.output === null)) {
            if (this.props.output.length === 0) {
                classes += " italic is-warning";
                value = "Output was an empty string."
            }
            else {
                if (this.props.knownCorrects.length) {
                    if (this.props.knownCorrects.includes(this.props.output)) {
                        classes += " is-valid";
                    }
                    else {
                        classes += " is-invalid";
                    }
                }
                value = this.props.output;
            }
        }
        return (
            <tr>
                <td>
                    <span className="input-group-text">{this.props.module}</span>
                </td>
                <td>
                    {/* onChange={this.handleOutput} */}
                    <input type="text" className={classes} value={value} aria-label="Output" readOnly/>
                </td>
            </tr>
        );
    }
}

export default Row;