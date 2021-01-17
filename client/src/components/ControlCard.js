import React from "react";
import '../css/Card.css';

class ControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
            <div className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card">
                    <div className="card-header mt-2">
                        <div className="float-right">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                            </div>
                        </div>
                        <h5 className="car-title">Controles</h5>
                    </div>
                    <div className="card-body py-2">
                        <form>
                            <div class="form-group">
                                <label htmlFor="customRange1" className="form-label">Threshold</label>
                                <input type="range" className="form-range" id="customRange1" />
                            </div>
                            <div class="form-group">
                                <label htmlFor="customRange1" class="form-label">Min value</label>
                                <input type="range" className="form-range" id="customRange1" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      );
    }
  }

export default ControlCard;