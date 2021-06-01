import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="header box">
                <div className="header-flex w-100">
                    <code style={{flexGrow: 1, color: "#212529"}}>Tom Aarsen</code>
                    
                    <code>
                        <NavLink className="dark" exact to="/projects">
                        .projects()
                        </NavLink>
                    </code>
                    <code>
                        <NavLink className="dark" exact to="/about">
                        .about()
                        </NavLink>
                    </code>
                    <code>
                        <a className="dark" href="https://www.github.com/tomaarsen" target="_blank" rel="noopener noreferrer">
                        .github()
                        </a>
                    </code>
                    <code>

                        .contact()
                    </code>
                </div>
            </div>
        );
    }
}

export default Header;