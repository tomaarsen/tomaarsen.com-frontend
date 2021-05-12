import React from "react";
import {
    Route,
    BrowserRouter
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Try from "./projects/inflex/Try";
import Performance from "./projects/inflex/Performance";
import Readme from "./projects/Readme";
import Projects from "./projects/Overview";

import "../css/App.css";

class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            repos: []
        }
    }

    componentDidMount() {
        fetch("https://api.github.com/users/tomaarsen/repos")
            .then(r => r.json())
            .then(r => this.setState({ repos: r }))
    }

    render() {
        return (
            <BrowserRouter>
                <div className="wrapper">
                    <Header />
                    <Sidebar repos={this.state.repos} />
                    <div className="content h-100" style={{ overflow: "hidden" }}>
                        <Route exact path="/projects">
                            <Projects repos={this.state.repos}/>
                        </Route>
                        <Route exact path="/projects/inflex/try" component={Try} />
                        <Route exact path="/projects/inflex/performance" component={Performance} />
                        {this.state.repos.map(repo => {
                            return (
                                <Route exact path={`/projects/${repo['name']}`} key={repo.id}>
                                    <Readme repo={repo} />
                                </Route>
                            )
                        })}
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;