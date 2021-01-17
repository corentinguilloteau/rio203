import React from "react";
import TimeSerieCard from './TimeSerieCard';
import ControlCard from './ControlCard';
import '../css/App.css';

class Sensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{'Sensor #' + this.props.match.params.id}</h3>
                </div>
            </div>
            <div className="row">
                <ControlCard />
                <TimeSerieCard name="Température" />
            </div>  
            <div className="row">
                <TimeSerieCard name="Puissance consommée" />
            </div>        
        </div>
      );
    }
  }

export default Sensor;