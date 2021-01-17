import '../css/App.css';
import Dashboard from './Dashboard'
import Sensor from './Sensor'
import Room from './Room'
import Power from './Power'
import React from "react";
import Rooms from './Rooms'
import Sensors from './Sensors'
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
              <Route exact path='/sensors' component={Sensors} />
              <Route path='/rooms' component={Rooms} />
              <Route path='/room/:id' component={Room} />
              <Route path='/sensor/:id' component={Sensor} />
            </Switch>
          </div>
      );
    }
  }

export default App;
