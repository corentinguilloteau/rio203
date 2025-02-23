import React from "react";
import '../css/Card.css';
import { Link } from 'react-router-dom';

class TableCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
        <div className="col d-flex">
            <div className="card">
                <div className="card-header">
                    <h5 className="car-title mt-2">{this.props.name}</h5>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{width: '40%' }}>Nom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.items.map((item) =>
                            <tr key={item.id}>
                                <td><Link to={this.props.baseUrl + item._id}>{item.name}</Link></td>
                                <td class="table-action">
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      );
    }
  }

export default TableCard;