import React from "react";
import TableCard from './TableCard';
import '../css/App.css';

class Sensors extends React.Component {
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
                    <h3>{'Sensors'}</h3>
                </div>
            </div>
            <div className="row">
                <TableCard name="Sensors List" />
            </div> 
        </div>
      );
    }
  }

export default Sensors;