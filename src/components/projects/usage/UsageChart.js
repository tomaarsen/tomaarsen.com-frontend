import React from "react";
import { Line, Chart } from 'react-chartjs-2';
import zoomPlugin from "chartjs-plugin-zoom";
import 'chartjs-adapter-moment';

Chart.register(zoomPlugin);

const colors = [
    "rgba(38, 70, 83, 1.0)",
    "rgba(42, 157, 143, 1.0)",
    "rgba(233, 196, 106, 1.0)",
    "rgba(244, 162, 97, 1.0)",
    "rgba(231, 111, 81, 1.0)",
]

const reset = (event) => {
    event.chart.resetZoom();
}

const options = {
    animation: {
        duration: 500,
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {},
    parsing: {
        xAxisKey: "date",
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    plugins: {
        tooltip: {
            axis: "x",
            intersect: false,
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
                modifierKey: "shift",
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                drag: {
                    enabled: true,

                },
                mode: 'x',
            }
        },
    },
    onClick: reset,
};


const cumulativeFn = (data) => {
    let keys = Object.keys(data[0]).filter(key => key !== "date");
    let prev = Object.fromEntries(keys.map(key => [key, 0]));
    let cumulativeData = data.map(element => {
        let freshElement = {date: element["date"]};
        keys.forEach(key => {
            freshElement[key] = element[key] + prev[key];
            prev[key] = freshElement[key];
        });
        return freshElement;
    });
    return cumulativeData;
};


const smooth = (data, weight) => {
    let keys = Object.keys(data[0]).filter(key => key !== "date");
    let prev = Object.fromEntries(keys.map(key => [key, 0]));
    console.log(prev);
    let smoothedData = data.map(element => {
        let freshElement = {date: element["date"]};
        keys.forEach(key => {
            freshElement[key] = prev[key] * weight + element[key] * (1 - weight);
            prev[key] = freshElement[key];
        });
        return freshElement;
    });
    return smoothedData;
}


class UsageChart extends React.Component {

    render() {

        let rawData = this.props.data;
        const metrics = this.props.metrics;
        const cumulative = this.props.cumulative;
        const smoothingWeight = this.props.smoothingWeight;

        options.scales = {
            x: {
                type: "time",
                time: {
                    format: 'YYYY-MM-DD',
                }
            },
        };
        let datasets = [];
        metrics.forEach((metric, index) => {
            if (!(metric in rawData)){
                return;
            }
            let metricData = rawData[metric].data;
            if (cumulative){
                metricData = cumulativeFn(metricData);
            }
            else {
                metricData = smooth(metricData, smoothingWeight);
            }
            switch (metric) {
                case 'hf_models':
                    datasets.push(
                        {
                            label: "# of Hugging Face Hub models",
                            data: metricData,
                            parsing: {
                                yAxisKey: "models",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                        }
                    )
                    break;
                case 'github_stars':
                    datasets.push(
                        {
                            label: "# of GitHub stars",
                            data: metricData,
                            parsing: {
                                yAxisKey: "stars",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                        }
                    )
                    break;
                case 'github_comments':
                    datasets.push(
                        {
                            label: "# of GitHub comments",
                            data: metricData,
                            parsing: {
                                yAxisKey: "comments",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                            borderDash: [5, 5],
                        }
                    )
                    datasets.push(
                        {
                            label: "# of GitHub comments excluding @tomaarsen",
                            data: metricData,
                            parsing: {
                                yAxisKey: "comments_without_me",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                        }
                    )
                    break;
                case 'github_issues':
                    const issueData = metricData.map((element) => {
                        element["issues"] = element["opened_issues"] - element["closed_issues"];
                        element["prs"] = element["opened_prs"] - element["closed_prs"];
                        return element;
                    });
                    datasets.push(
                        {
                            label: "# of GitHub issues",
                            data: issueData,
                            parsing: {
                                yAxisKey: "issues",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                        }
                    )
                    datasets.push(
                        {
                            label: "# of GitHub PRs",
                            data: issueData,
                            parsing: {
                                yAxisKey: "prs",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                            borderDash: [5, 5],
                        }
                    )
                    break;
                case 'pypi':
                    if (cumulative){
                        metricData = metricData.map(element => {
                            element.downloads += rawData[metric].startDownloads;
                            return element;
                        });
                    }
                    datasets.push(
                        {
                            label: "# of PyPI downloads",
                            data: metricData,
                            parsing: {
                                yAxisKey: "downloads",
                            },
                            yAxisID: metric,
                            borderColor: colors[index],
                            backgroundColor: colors[index],
                        }
                    )
                    break;
                default:
                    break;
            }

            // Add axes
            options.scales[metric] = {
                position: "right",
                ticks: {
                    color: colors[index],
                },
                grid: {
                    drawOnChartArea: index === 0,
                }
            }
            if (metric === "pypi" && cumulative) {
                options.scales[metric].beginAtZero = true;
            }
        });
        const data = {
            datasets: datasets,
        };

        return <Line data={data} options={options}/>
    }
}

export default UsageChart;