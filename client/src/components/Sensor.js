import React from "react";
import TimeSerieCard from './TimeSerieCard';
import ControlCard from './ControlCard';
import '../css/App.css';
import { baseURL } from './globals';

class Sensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: { name: "" },
            sensor: { data: []}
        };
    }

    getSensor() {
        fetch(this.context + "/devices/" + this.props.match.params.id + '/sensors/' + this.props.match.params.sid, {headers : 
          { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
          .then((res) => {return res.json()})
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                sensor: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
              console.log(error);
            }
          )
      }
  
      getDevice()
      {
          fetch(this.context + "/devices/" + this.props.match.params.id, {headers : 
              { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            })
              .then((res) => {return res.json()})
              .then(
                (result) => {
                    console.log(result)
                  this.setState({
                    isLoaded: true,
                    device: result
                  });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                  console.log(error);
                }
              )
      }
  
      componentDidMount() {
          this.getSensor();
          this.getDevice();
      }

    switchComponents(data)
    {
        switch(data.type)
        {
            case 'timeserie':
                console.log("timeserie");
                return <TimeSerieCard name={data.name} valuekey={data.value_key} params={data.params} baseURL={this.context + "/devices/" + this.props.match.params.id + '/sensors/' + this.props.match.params.sid + '/'}/>
            default:
                console.log("defaultr");
                break;
        }
    }

    render() {

        console.log(this.state.sensor)
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{this.state.device.name + ' - ' + this.state.sensor.name}</h3>
                </div>
            </div>
            <div className="row">
                <ControlCard />
                {
                    this.state.sensor.data.map((data) => {
                        return this.switchComponents(data)
                    })
                }
            </div>  
       
        </div>
      );
    }
  }

  Sensor.contextType = baseURL;

export default Sensor;