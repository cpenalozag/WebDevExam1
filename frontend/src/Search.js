import React from 'react';
import './App.css';


class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user1: '',
            user2: ''
        }
    }

    change1(val) {
        this.setState({
            user1: val
        })
    }

    change2(val) {
        this.setState({
            user2: val
        })
    }

    isEnabled() {
        return this.state.user1.length > 0 && this.state.user2.length > 0;
    }

    render() {
        return (
            <div className="container">

                <div className="row">
                    <div className="col-md-2 search">

                    </div>
                    <div className="col-md-3 search">
                        <input className="" required="required" className="form-control" type="text" placeholder="First username"
                               onChange={(event) => this.change1(event.target.value)}/>
                    </div>
                    <div className="col-md-2 search">
                        <button disabled={!this.isEnabled()} className="btn btn-primary button" onClick={
                            () => {
                                this.props.executeQuery(this.state.user1, this.state.user2);
                            }
                        }>Fight!
                        </button>
                    </div>
                    <div className="col-md-3 search">
                        <input required className="form-control" type="text" placeholder="Second username"
                               onChange={(event) => this.change2(event.target.value)}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default Search;