import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="header box">
                <div className="header-flex w-100">
                    <code style={{flexGrow: 1, color: "#212529"}}>
                        <NavLink className="dark" exact to="/home">
                        Tom Aarsen
                        </NavLink>
                    </code>
                    
                    <code>
                        <NavLink className="dark" exact to="/projects">
                        .projects()
                        </NavLink>
                    </code>
                    <code>
                        <NavLink className="dark" exact to="/home">
                        .about()
                        </NavLink>
                    </code>
                    <code>
                        <a className="dark" href="https://www.github.com/tomaarsen" target="_blank" rel="noopener noreferrer">
                        .github()
                        </a>
                    </code>
                    <code>
                        <a className="dark" href="https://www.linkedin.com/in/tomaarsen" target="_blank" rel="noopener noreferrer">
                        .linkedin()
                        </a>
                    </code>
                    <code>
                        <a className="dark" href="https://github.com/tomaarsen/tomaarsen.com-frontend" target="_blank" rel="noopener noreferrer">
                            v{process.env.REACT_APP_VERSION}
                        </a>
                    </code>
                    {/* <code>
                        .email()
                    </code> */}
                </div>
            </div>
        );
    }
}

export default Header;