import React from "react";
import { NavLink } from 'react-router-dom';

class NotFound extends React.Component {
    render() {
        return(
            <div className="box">
                <h4>404 - Not Found!</h4>
                <hr />
                <NavLink to="/home">Go Home</NavLink>  
            </div>
        )
    }
}

export default NotFound;