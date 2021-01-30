import '../css/App.css';
import Dashboard from './Dashboard'
import Sensor from './Sensor'
import Room from './Room'
import Power from './Power'
import React from "react";
import Rooms from './Rooms'
import Device from './Device'
import Devices from './Devices'
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
          <div className="content">
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/power' component={Power} />
              <Route exact path='/rooms' component={Rooms} />
              <Route path='/room/:id' component={Room} />
              <Route exact path='/devices' component={Devices} />
              <Route exact path='/devices/:id' component={Device} />
              <Route path='/devices/:id/sensors/:sid' component={Sensor} />
            </Switch>
          </div>
      );
    }
  }

export default App;
