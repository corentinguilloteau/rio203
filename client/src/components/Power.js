import React from "react";
import TimeSerieCard from './TimeSerieCard';
import InformationCard from './InformationCard';
import '../css/App.css';

class Power extends React.Component {
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
                    <h3>{'Power'}</h3>
                </div>
            </div>
            <div className="row">
                <TimeSerieCard name="Puissance totale consommée" />
            </div>
            <div className="row">
                <InformationCard name="Sensor #1" value="10W" icon="thermometer-three-quarters" color="green" type="simpactuat" />
                <InformationCard name="Sensor #2" value="10W" icon="tint" color="blue"/>
                <InformationCard name="Sensor #3" value="15W" icon="exclamation-triangle" color="red"/>
                <InformationCard name="Sensor #4" value="10W" icon="thermometer-three-quarters" color="green" type="simpactuat" />
                <InformationCard name="Sensor #5" value="10W" icon="tint" color="blue"/>
                <InformationCard name="Sensor #6" value="15W" icon="exclamation-triangle" color="red"/>  
            </div>      
        </div>
      );
    }
  }

export default Power;