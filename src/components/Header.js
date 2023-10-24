import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
    render() {
        return (
            <div className="header box">
                <div className="header-flex w-100">
                    <NavLink className="dark" exact to="/home">
                        <h6>Tom Aarsen</h6>
                    </NavLink>
                    <div style={{ flexGrow: 1 }}/>

                    <code>
                        <NavLink className="dark" exact to="/projects/usage">
                            .usage()
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
                        <a className="dark" href="https://www.github.com/tomaarsen">
                            .github()
                        </a>
                    </code>
                    <code>
                        <a className="dark" href="https://www.linkedin.com/in/tomaarsen">
                            .linkedin()
                        </a>
                    </code>
                    <code>
                        <a className="dark" href="https://github.com/tomaarsen/tomaarsen.com-frontend">
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