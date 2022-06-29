import React from "react";
import { NavLink } from 'react-router-dom';

import "../css/not_found.css";

class NotFound extends React.Component {
    render() {
        return (
            <div class="dvd_container">
                <NavLink className="dark" to="/home">
                    <div className="box" style={{ width: "max-content" }}>
                        <h4>404 - Not Found!</h4>
                        <hr />
                        <a href="/home">Go home</a>, you're drunk.
                    </div>
                </NavLink>

                <NavLink className="dark" to="/home">
                    <div className="box delay" style={{ width: "max-content" }}>
                        <h4>404 - Not Found!</h4>
                        <hr />
                        <a href="/home">Go home</a>, you're drunk.
                    </div>
                </NavLink>

                <NavLink className="dark" to="/home">
                    <div className="box large_delay" style={{ width: "max-content" }}>
                        <h4>404 - Not Found!</h4>
                        <hr />
                        <a href="/home">Go home</a>, you're drunk.
                    </div>
                </NavLink>
            </div>
        )
    }
}

export default NotFound;