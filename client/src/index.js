import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Sidebar from './components/Sidebar';
import InformationCard from './components/InformationCard';
import TimeSerieCard from './components/TimeSerieCard';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Main extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
          isSidebarCollapsed: false         
        };

        this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
    }

    handleSidebarToggle(e) {
      this.setState((state) => ({isSidebarCollapsed: !state.isSidebarCollapsed}));
    }

    render() {
      const isSidebarCollapsed = this.state.isSidebarCollapsed;
      return (<React.StrictMode>
                <Sidebar collapsed={isSidebarCollapsed} items={[{id: 0, name: 'Dashboard', icon: 'home', link: '/'}, {id: 1, name: 'Consomation', icon: 'bolt', link: '/power'}]} activeItemId={0} />
                <div className="main">
                  <nav className="navbar">
                    <div className="sidebar-toggle">
                      <i className="fas fa-fw fa-bars hamburger" onClick={this.handleSidebarToggle}></i>
                    </div>
                  </nav>
                  <div className="content">
                    <div className="container-fluid">
                      <div className="row mb-2 mb-xl-3">
                        <div className="col-auto d-none d-sm-block">
                          <h3>{this.props.title}</h3>
                        </div>
                      </div>
                      <div className="row">
                        <InformationCard name="Temperature chambre" value="18°C" icon="thermometer-three-quarters" color="green"/>
                        <InformationCard name="Lumière salon" value="Allumée" icon="lightbulb" color="yellow"/>
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      <div className="row">
                        <TimeSerieCard name="Lumière salon" />
                      </div>
                      
                    </div>
                  </div>
                </div>
              </React.StrictMode>
        );
    }
}

ReactDOM.render(
  <Main title="Dashboard" />,
  document.getElementById('wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
