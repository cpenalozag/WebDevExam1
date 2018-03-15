import React from 'react'
import './App.css';


class ResultsChallenge extends React.Component {


    render() {
        if (this.props.user1.username && this.props.user2.username) {
            var divStyle = {
                marginLeft: '15%'
            };
            return (

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="wrapper" >
                                <div className="giftcard text-center">
                                    <div className="card">
                                        <h4 className="text-center"><strong>{this.props.user1.results}</strong></h4>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="img"
                                                     src={this.props.user1.profile_pic_url_hd}
                                                     alt={this.props.user1.username + " picture"}/>
                                            </div>
                                            <div className="col-md-8">
                                                <p><strong>Username:</strong> {this.props.user1.username}</p>
                                                <p><strong>Followers:</strong> {this.props.user1.edge_followed_by.count}</p>
                                                <p><strong>Total likes:</strong> {this.props.user1.totalLikes}</p>
                                                <p><strong>Number of pictures:</strong> {this.props.user1.edge_owner_to_timeline_media.count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="wrapper" style={divStyle}>
                                <div className="giftcard text-center">
                                    <div className="card">
                                        <h4 className="text-center"><strong>{this.props.user2.results}</strong></h4>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <img className="img"
                                                     src={this.props.user2.picture}
                                                     alt={this.props.user2.username + " picture"}/>
                                            </div>
                                            <div className="col-md-8">
                                                <p><strong>Username:</strong> {this.props.user2.username}</p>
                                                <p><strong>Followers:</strong> {this.props.user2.followers}</p>
                                                <p><strong>Total likes:</strong> {this.props.user2.likes}</p>
                                                <p><strong>Number of pictures:</strong> {this.props.user2.pictures}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default ResultsChallenge;