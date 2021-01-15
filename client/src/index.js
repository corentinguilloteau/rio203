import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Sidebar from './components/Sidebar';
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
                </div>
              </React.StrictMode>
        );
    }
}

ReactDOM.render(
  <Main />,
  document.getElementById('wrapper')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
