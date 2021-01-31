import React from "react";
import TableCard from './TableCard';
import '../css/App.css';

class Devices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          items: []
        };
    }

    componentDidMount() {
      fetch("/api/devices/", {headers : 
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
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              items: []
            });
            console.log(error);
          }
        )
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{'Appareils'}</h3>
                </div>
            </div>
            <div className="row">
                <TableCard name="Listes des appareils" items={this.state.items} baseUrl='/devices/'/>
            </div> 
        </div>
      );
    }
  }

export default Devices;