import React from "react";
import '../css/Sidebar.css';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemId: props.activeItemId
        };
    }

    render() {
      return (
        <nav id="sidebar" className={'sidebar ' + (this.props.collapsed ? 'collapsed' : '')} >
            <SimpleBar style={{ maxHeight: 300 }}>
                <div className="sidebar-top"></div>
                <ul className="sidebar-nav">
                    {
                        this.props.items.map((item) =>
                            <li key={item.id} className={"sidebar-item " + ((item.id === this.state.activeItemId) ? 'active' : '') }>
                                <a href={item.link} className="sidebar-link">
                                    <i className={"fas fa-fw fa-" + item.icon}></i>
                                    <span className="align-middle">{item.name}</span>
                                </a>
                            </li>
                        )
                    }
                </ul>
            </SimpleBar>
        </nav>
      );
    }
  }

export default Sidebar;