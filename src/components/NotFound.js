import React from "react";
import { NavLink } from 'react-router-dom';

import "../css/not_found.css";

class NotFound extends React.Component {
    render() {
        return (
            <div class="dvd_container">
                <div className="box" style={{ width: "max-content" }}>
                    <h4>404 - Not Found!</h4>
                    <hr />
                    <NavLink to="/home">Go Home</NavLink>, you're drunk.
                </div>

                <div className="box delay" style={{ width: "max-content" }}>
                    <h4>404 - Not Found!</h4>
                    <hr />
                    <NavLink to="/home">Go Home</NavLink>, you're drunk.
                </div>

                <div className=" box large_delay" style={{ width: "max-content" }}>
                    <h4>404 - Not Found!</h4>
                    <hr />
                    <NavLink to="/home">Go Home</NavLink>, you're drunk.
                </div>
            </div>
        )
    }
}

export default NotFound;