import React from 'react'
import './App.css';


class History extends React.Component {

    renderEntry(pId, pU1, pU2) {
        return <Entry key={pId} username1={pU1} username2={pU2}/>
    }

    render() {
        console.log(this.props.history);
        if (this.props.history) {
            return (
                <div className="container">
                    <div className="text-center"><h3>History</h3></div>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="table-responsive">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Winner</th>
                                        <th></th>
                                        <th>Loser</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.history.map(
                                        (data) => this.renderEntry(data._id, data.usernameWinner, data.usernameLoser))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>

                </div>
            )
        }
    }
}

class Entry extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.username1}</td>
                <td>VS</td>
                <td>{this.props.username2}</td>
            </tr>
        );
    }
}

export default History;