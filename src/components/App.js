import React, { lazy, Suspense } from "react";
import {
    Route,
    BrowserRouter,
    Redirect,
    Switch
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import NotFound from "./NotFound";
import Loading from "./Loading";

import Try from "./projects/inflex/Try";
import Readme from "./projects/Readme";
import Overview from "./projects/Overview";

import UsagePlot from "./projects/nltk/UsagePlot";
import UsageList from "./projects/nltk/UsageList";

import AboutPage from "./about/AboutPage";

import "../css/color.css";
import "../css/fonts.css";
import "../css/App.css";

// Load the expensive Performance tab lazily,
// allowing it to be built into a separate package
const Performance = lazy(() => import("./projects/inflex/Performance"));

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
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/projects/inflex/paper" />
                <div className="layout">
                    <Header />
                    <Sidebar repos={this.state.repos} />
                    <div className="content h-100" style={{ overflow: "hidden" }}>
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route exact path="/projects">
                                    <Overview repos={this.state.repos} />
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

                                {/* Catch all - redirect to 404 */}
                                <Route path="/404" exact={true} component={NotFound} />
                                {this.state.repos.length > 0 && <Redirect to="/404" />}
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;