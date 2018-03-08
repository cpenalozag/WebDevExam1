import React from 'react';
import './App.css';
import {Button} from 'react-bootstrap';


class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user1: '',
            user2: ''
        }
    }


    change1(val) {
        console.log(val);
        this.setState({
            user1: val
        })
    }

    change2(val) {
        console.log(val);
        this.setState({
            user2: val
        })
    }


    render() {
        return (
            <div className="container">
                <br/>
                <div className="col-md-10">
                    <p>Welcome to InstaFights! Input two instagram usernames and the one with the most likes wins!</p>
                </div>
                <div className="row">


                    <div className="col-md-2"></div>
                    <div className="col-md-3 search">
                        <input className="form-control" type="text" placeholder="Handle of user 1"
                               onChange={(event) => this.change1(event.target.value)}/>
                    </div>
                    <div className="col-md-1 search">
                        <Button className="btn btn-primary button" onClick={
                            () => {
                                this.props.executeQuery(this.state.user1, this.state.user2)
                            }
                        }>Fight!</Button>
                    </div>
                    <div className="col-md-3 search">
                        <input className="form-control" type="text" placeholder="Handle of user 2"
                               onChange={(event) => this.change2(event.target.value)}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Search;