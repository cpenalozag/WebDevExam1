import React from 'react';
import './App.css';


class SearchChampion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user1: ''
        }
    }

    change1(val) {
        this.setState({
            user1: val
        })
    }

    isEnabled() {
        return this.state.user1.length > 0;
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-3 search">

                    </div>
                    <div className="col-md-3 search">
                        <input className="" required="required" className="form-control" type="text" placeholder="Type in your username"
                               onChange={(event) => this.change1(event.target.value)}/>
                    </div>
                    <div className="col-md-2 search">
                        <button disabled={!this.isEnabled()} className="btn btn-primary button" onClick={
                            () => {
                                this.props.challenge(this.state.user1);
                            }
                        }>Challenge!
                        </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default SearchChampion;