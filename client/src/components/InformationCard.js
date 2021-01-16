import React from "react";
import '../css/Card.css';

class InformationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
            <div name={this.props.name}  className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card clickable">
                    <a className="no-link" href={"/sensor/" + this.props.sensorId}>
                        <div className="card-body py-4">
                            <div className="media">                              
                                <div className="media-body">
                                    <h3 className="mb-2">{this.props.value}</h3>
                                    <p className="mb-2">{this.props.name}</p>
                                </div>
                                <div className="icon-block ml-3">
                                    <div className={"round " + (this.props.color)}>
                                        <i className={"fas fa-fw fa-" + (this.props.icon)}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
      );
    }
  }

export default InformationCard;