import React from "react";
import "chartjs-plugin-datalabels";
import "chartjs-plugin-zoom";
import { Bar, Chart, defaults } from 'react-chartjs-2';

import "../../../css/form.css";
import "../../../css/chart.css";

const colors = [
    "rgba(38, 70, 83, 0.6)",
    "rgba(42, 157, 143, 0.6)",
    "rgba(233, 196, 106, 0.6)",
    "rgba(244, 162, 97, 0.6)",
    "rgba(231, 111, 81, 0.6)",
]

// console.log(defaults);
defaults.global.pointHitDetectionRadius = 1;

var customTooltips = function (tooltip) {
    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');

    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chartjs-tooltip';
        tooltipEl.innerHTML = '<table></table>';
        this._chart.canvas.parentNode.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = 0;
        return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
        tooltipEl.classList.add(tooltip.yAlign);
    } else {
        tooltipEl.classList.add('no-transform');
    }

    function getBody(bodyItem) {
        return bodyItem.lines;
    }

    // Set Text
    if (tooltip.body) {
        var titleLines = tooltip.title || [];
        var bodyLines = tooltip.body.map(getBody);

        var innerHtml = '<thead>';

        titleLines.forEach(function (title) {
            innerHtml += '<tr><th>' + title + '</th><th>Accuracy</th></tr>';
        });
        innerHtml += '</thead><tbody>';

        bodyLines.forEach(function (body, i) {
            var colors = tooltip.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
            var split_body = body[0].split(":");
            var from_type = split_body[0];
            var accuracy = parseFloat(split_body[1]).toFixed(2) + '%';
            innerHtml += '<tr><td>' + span + from_type + '</td><td style="text-align:right">&nbsp;' + accuracy + '</td></tr>';
        });
        innerHtml += '</tbody>';

        var tableRoot = tooltipEl.querySelector('table');
        tableRoot.innerHTML = innerHtml;
    }

    var positionY = this._chart.canvas.offsetTop;
    var positionX = this._chart.canvas.offsetLeft;

    var offset = tooltip.caretX;
    if (offset < tooltip.width)
        offset = tooltip.width;
    else if (tooltip.caretX > this._chart.width - tooltip.width)
        offset = this._chart.width - tooltip.width;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + offset + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
    tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
    tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
    tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
};

const options = {
    animation: {
        duration: 750,
    },

    layout: {
        padding: {
            // top: 20
            top: 10
        }
    },

    scales: {
        yAxes: [{
            ticks: {
                min: 90,
                max: 100,
            }
        }],
    },

    tooltips: {
        enabled: false,
        mode: 'index',
        position: 'nearest',
        custom: customTooltips
    },

    plugins: {
        datalabels: {
            // color: 'white',
            anchor: 'end',
            align: 'top',
            clamp: true, // Doesn't keep labels within graph
            formatter: function (value, context) {
                return value.toFixed(2) + '%';
            },
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'y',
                rangeMin: {
                    y: 0,
                },
                rangeMax: {
                    y: 100,
                },
            },
            zoom: {
                enabled: true,
                mode: 'y',
                rangeMin: {
                    y: 0,
                },
                rangeMax: {
                    y: 100,
                },
            }
        },
    },
    maintainAspectRatio: false,
    responsive: true,
};

const wordform_to_human_readable = {
    "sing": "Singular",
    "plur": "Plural",
    "past": "Past",
    "pres_part": "Present Participle",
    "past_part": "Past Participle",
    "comp": "Comparative",
    "super": "Superlative",
}

const pos_to_human_readable_plural = {
    "n": "Nouns",
    "v": "Verbs",
    "a": "Adjectives",
}

const wordform_ordering = [
    "sing", "plur", "past", "pres_part", "past_part", "comp", "super"
]

class PerformanceChart extends React.Component {

    componentDidMount() {
        // Code to increase size between legend and graph
        Chart.NewLegend = Chart.Legend.extend({
            afterFit: function () {
                this.height = this.height + 20;
            },
        });

        function createNewLegendAndAttach(chartInstance, legendOpts) {
            var legend = new Chart.NewLegend({
                ctx: chartInstance.chart.ctx,
                options: legendOpts,
                chart: chartInstance
            });

            if (chartInstance.legend) {
                Chart.layouts.removeBox(chartInstance, chartInstance.legend);
                delete chartInstance.newLegend;
            }

            chartInstance.newLegend = legend;
            Chart.layouts.addBox(chartInstance, legend);
        }

        // Register the legend plugin
        Chart.plugins.register({
            beforeInit: function (chartInstance) {
                var legendOpts = chartInstance.options.legend;

                if (legendOpts) {
                    createNewLegendAndAttach(chartInstance, legendOpts);
                }
            },
            beforeUpdate: function (chartInstance) {
                var legendOpts = chartInstance.options.legend;

                if (legendOpts) {
                    legendOpts = Chart.helpers.configMerge(Chart.defaults.global.legend, legendOpts);

                    if (chartInstance.newLegend) {
                        chartInstance.newLegend.options = legendOpts;
                    } else {
                        createNewLegendAndAttach(chartInstance, legendOpts);
                    }
                } else {
                    Chart.layouts.removeBox(chartInstance, chartInstance.newLegend);
                    delete chartInstance.newLegend;
                }
            },
            afterEvent: function (chartInstance, e) {
                var legend = chartInstance.newLegend;
                if (legend) {
                    legend.handleEvent(e);
                }
            }
        });
    }

    render() {
        let datasets = [];
        let i = 0;
        for (const [key, value] of Object.entries(this.props.performance).sort((a, b) => {
            return wordform_ordering.indexOf(a[0]) - wordform_ordering.indexOf(b[0]);
        })) {
            datasets.push({
                label: `From ${wordform_to_human_readable[key]}`,
                data: value,
                backgroundColor: colors[i],
                borderWidth: 10,
                // barThickness: 50,

                categoryPercentage: 0.95,
                barPercentage: 1,
                // datalabels: {
                //     color: label_colors[i],
                // }
            })
            i++;
        }

        let data = {
            labels: this.props.labels,
            datasets: datasets
        }

        return (
            <div className="chart-container" >
                <div style={{ textAlign: "center" }}>
                    Accuracy of Python Modules when converting {pos_to_human_readable_plural[this.props.pos]} to {wordform_to_human_readable[this.props.wordform]} ({this.props.nTerms} terms tested)
                </div>
                <Bar data={data} options={options} />
            </div>
        )
    }
}

export default PerformanceChart;