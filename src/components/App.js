import React from "react";
import {
    Route,
    BrowserRouter,
    Redirect
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
// import NotFound from "./NotFound";

import Try from "./projects/inflex/Try";
import Performance from "./projects/inflex/Performance";
import Readme from "./projects/Readme";
import Projects from "./projects/Overview";

import UsagePlot from "./projects/nltk/UsagePlot";
import UsageList from "./projects/nltk/UsageList";

import AboutPage from "./about/AboutPage";

import "../css/App.css";

class Main extends React.Component {

    constructor() {
        super();
        this.state = {
            repos: []
        }
    }

    componentDidMount() {
        fetch("https://api.github.com/users/tomaarsen/repos?per_page=100")
            .then(r => r.json())
            .then(r => this.setState({ repos: r }))

        // fetch("api/inflex/paper")
        //     .then()
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/projects/inflex/paper" />
                <div className="layout">
                    <Header />
                    <Sidebar repos={this.state.repos} />
                    <div className="content h-100" style={{ overflow: "hidden" }}>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                        <Route exact path="/projects">
                            <Projects repos={this.state.repos} />
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
                        <Route exact path="/home" component={AboutPage} />
                        <Route exact path="/projects/nltk/usage">
                            <Redirect to="/projects/nltk/usage/plot" />
                        </Route>
                        <Route exact path="/projects/nltk/usage/plot" component={UsagePlot} />
                        <Route exact path="/projects/nltk/usage/list" component={UsageList} />
                        {/* Catch all route */}
                        {/* <Route path="*" component={NotFound} /> */}
                    </div>
                    {/* <About /> */}
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;