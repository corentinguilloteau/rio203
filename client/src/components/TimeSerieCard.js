import React from "react";
import '../css/Card.css';
import Chart from "react-apexcharts";

class TimeSerieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    type: 'area',
                    stacked: false
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 0.5,
                      opacityTo: 0,
                      stops: [0, 90, 100]
                    }
                  },
                  yaxis: {
                    title: {
                      text: 'Price'
                    },
                    type: 'numeric'
                  },
                    xaxis: {
                        type: 'numeric'
                    }
            },
            series: [{
                name: 'XYZ MOTORS',
                data: [[
                    1,  20000000
                
                  ],
                  [
                    2,  10379978
                ],
                [
                     3,  30493749
                ],
                [
                     4,  10785250
                ]]
            }]
        };
    }

    render() {
      return (
            <div name={this.props.name}  className="col d-flex">
                <div className="card">
                    <div className="card-header">
                        <h5 className="car-title mt-2">{this.props.name}</h5>
                    </div>
                    <div className="card-body py-2">
                        <div className="chart w-100">
                        <Chart
                            className="plot" options={this.state.options}
                            series={this.state.series}
                            type="area"
                            height="100%"
                        />
                        </div>
                    </div>
                </div>
            </div>
      );
    }
  }

export default TimeSerieCard;