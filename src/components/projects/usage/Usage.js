import React from "react";

import UsageChart from "./UsageChart";

import "../../../css/usage.css";

import { postJson } from "../../../js/utils.js";

class Usage extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,

            package: "sentence-transformers",
            metrics: ["hf_models"],

            cumulative: true,
            smoothingWeight: 0.8,

            usage: {}
        };

        this.packages = ["sentence-transformers", "setfit", "span_marker"]
        this.packages_to_pretty = {
            "sentence-transformers": "SentenceTransformers",
            "setfit": "SetFit",
            "span_marker": "SpanMarker",
        }

        this.metrics = ["hf_models", "github_stars", "github_issues", "github_comments", "pypi"]
        this.metrics_to_pretty = {
            "hf_models": "Hugging Face Hub Models",
            "github_stars": "GitHub Stars",
            "github_issues": "GitHub Issues & PRs",
            "github_comments": "GitHub Comments",
            "pypi": "PyPI Downloads",
        }

        this.handlePackage = this.handlePackage.bind(this);
        this.handleMetrics = this.handleMetrics.bind(this);
        this.handleCumulative = this.handleCumulative.bind(this);
        this.handleSmoothing = this.handleSmoothing.bind(this);
        this.startLoading = this.startLoading.bind(this);
        this.postAllUsages = this.postAllUsages.bind(this);
        this.postUsage = this.postUsage.bind(this);
    }

    handlePackage(event) {
        if (this.state.package !== event.target.value) {
            this.setState({package: event.target.value}, () => this.postAllUsages());
        }
        else {
            this.postAllUsages();
        }
    }

    handleMetrics(event) {
        if (!this.state.metrics.includes(event.target.value)) {
            this.setState(
                { metrics: this.state.metrics.concat([event.target.value]) },
                () => this.postUsage(event.target.value)
            )
        }
        else {
            this.setState({metrics: this.state.metrics.filter((metric) => metric !== event.target.value)});
        }
    }

    handleCumulative(event){
        this.setState({cumulative: !this.state.cumulative});
    }

    handleSmoothing(event){
        this.setState({smoothingWeight: event.target.value});
    }

    startLoading() {
        this.setState({ loading: true });
    }

    componentDidMount() {
        this.postAllUsages();
    }

    postAllUsages(){
        this.state.metrics.forEach(metrics => this.postUsage(metrics));
    }

    postUsage(metrics) {
        // Check if data is cached
        if (this.state.package in this.state.usage && metrics in this.state.usage[this.state.package]){
            return;
        }

        this.startLoading();
        postJson("/api/usage", {
            'package': this.state.package,
            'metrics': metrics,
        }).then(response => {
            response.data = Object.entries(response.data).map((e) => ( { ...e[1], "date": e[0] } ));
            this.setState(prevState => {
                if (this.state.package in prevState.usage){
                    return {
                        usage: {
                            ...prevState.usage,
                            [this.state.package]: {
                                ...prevState.usage[this.state.package],
                                [metrics]: response.data,
                            },
                        },
                        loading: false,
                    }
                }
                else {
                    return {
                        usage: {
                            ...prevState.usage,
                            [this.state.package]: {
                                [metrics]: response.data
                            }
                        },
                        loading: false,
                    }
                }
            });
        });
    }

    render() {
        console.log(this.state);
        return (
            <div className="usage-wrapper">
                { this.state.package in this.state.usage &&
                    <div className="usage-chart box">
                    <UsageChart
                        data={this.state.usage[this.state.package]}
                        package={this.state.package}
                        metrics={this.state.metrics}
                        cumulative={this.state.cumulative}
                        smoothingWeight={this.state.smoothingWeight}
                        />
                    </div>
                }

                <div className="box usage-sidebar">
                    <div className="spinner-border" style={{ position: "absolute", right: "1.5rem", opacity: this.state.loading ? 1 : 0 }} />

                    <form id="usage_form" className="row needs-validation" method="post" noValidate>
                        <div className="row-auto" >
                            {/* Package */}
                            <label htmlFor="package" className="form-label">Package</label>
                            {
                                this.packages.map((package_id, index) => {
                                    return (
                                        <div className="form-check" key={`package-form-${index}`}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="package"
                                                id={package_id}
                                                value={package_id}
                                                checked={this.state.package === package_id}
                                                key={`package-input-${index}`}
                                                onChange={this.handlePackage}
                                            />
                                            <label className="form-check-label" htmlFor={package_id} key={`package-label-${index}`}>
                                                {this.packages_to_pretty[package_id]}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <br />

                            {/* Metrics */}
                            <label htmlFor="metrics" className="form-label">Metrics</label>
                            {
                                this.metrics.map((metrics, index) => {
                                    return (
                                        <div className="form-check" key={`metrics-form-${index}`}>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={metrics}
                                                value={metrics}
                                                checked={this.state.metrics.includes(metrics)}
                                                key={`metrics-input-${index}`}
                                                onChange={this.handleMetrics}
                                            />
                                            <label className="form-check-label" htmlFor={metrics} key={`metrics-label-${index}`}>
                                                {this.metrics_to_pretty[metrics]}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                            <br />

                            {/* Cumulative */}
                            <label htmlFor="settings" className="form-label">Settings</label>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="cumulative"
                                    checked={this.state.cumulative}
                                    onChange={this.handleCumulative}
                                />
                                <label className="form-check-label" htmlFor="cumulative">
                                    Cumulative
                                </label>
                            </div>
                            <br />

                            {/* Smoothing */}
                            <label htmlFor="smoothing" className="form-label smoothing-label">Smoothing</label>
                            <div class="row">
                                <div class="col smoothing-col-left">
                                    <input
                                        className="form-range"
                                        type="range"
                                        id="smoothingWeightRange"
                                        disabled={this.state.cumulative}
                                        min="0"
                                        max="0.99"
                                        step="0.01"
                                        value={this.state.smoothingWeight}
                                        onChange={this.handleSmoothing}
                                    />
                                </div>
                                <div class="col-auto smoothing-col-right">
                                    <input
                                        className="form-control smoothing-number"
                                        type="number"
                                        id="smoothingWeight"
                                        disabled={this.state.cumulative}
                                        value={this.state.smoothingWeight}
                                        onChange={this.handleSmoothing}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Usage;
