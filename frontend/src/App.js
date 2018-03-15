import React, {Component} from 'react';
import './App.css';
import Search from './Search';
import Results from './Results';
import SearchChampion from "./SearchChampion";
import ResultsChallenge from "./ResultsChallenge";
import request from "superagent";
import History from "./History";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user1: {},
            user2: {},
            mode: 0,
            history: []
        }
    }

    updateHistory() {
        fetch("/history")
            .then((res) => {
                if (res.status !== 200) {
                    console.log("Error getting data");
                }
                return res.json();
            })
            .then((json) => {
                console.log(json);
                this.setState({history: json});
                console.log(this.state.history);
            });
    }

    getWinner(us1, us2) {
        let u1 = 0, u2 = 0;
        us1.user.edge_owner_to_timeline_media.edges.forEach((pic) => {
            u1 += pic.node.edge_liked_by.count;
        });
        us2.user.edge_owner_to_timeline_media.edges.forEach((pic) => {
            u2 += pic.node.edge_liked_by.count;
        });
        us1.user.totalLikes = u1;
        us2.user.totalLikes = u2;
        if (u1 > u2) {
            us1.user.results = "Winner";
            us2.user.results = "Loser";
            this.addHistory(us1.user.username, us2.user.username);
        }
        else {
            us1.user.results = "Loser";
            us2.user.results = "Winner";
            this.addHistory(us2.user.username, us1.user.username);
        }
        this.addFighter(us1.user);
        this.addFighter(us2.user);
        this.setState({user1: us1.user, user2: us2.user});
        this.updateHistory();
    }

    getWinnerChallenge(us1, us2) {
        let u1 = 0;
        us1.user.edge_owner_to_timeline_media.edges.forEach((pic) => {
            u1 += pic.node.edge_liked_by.count;
        });
        let u2 = us2.likes;
        us1.user.totalLikes = u1;
        if (u1 > u2) {
            us1.user.results = "Winner";
            us2.results = "Loser";
            this.addHistory(us1.user.username, us2.username);
        }
        else {
            us1.user.results = "Loser";
            us2.results = "Winner";
            this.addHistory(us2.username, us1.user.username);
        }
        this.addFighter(us1.user);
        this.setState({user1: us1.user, user2: us2});
        this.updateHistory();
    }

    addFighter(user) {
        const body = JSON.stringify({
            username: user.username,
            followers: user.edge_followed_by.count,
            likes: user.totalLikes,
            pictures: user.edge_owner_to_timeline_media.count,
            picture: user.profile_pic_url_hd
        });
        console.log(body);
        request
            .post("/fighters")
            .set("Content-Type", "application/json")
            .send(body)
            .end((err, res) => {
                console.log(res);
            });
    }

    addHistory(unw, unl) {
        const body = JSON.stringify({
            usernameWinner: unw,
            usernameLoser: unl
        });
        request
            .post("/history")
            .set("Content-Type", "application/json")
            .send(body)
            .end((err, res) => {
                console.log(res);
            });
    }

    componentDidMount() {
        this.updateHistory();
    }

    executeQuery(user1, user2) {
        let me = this;
        fetch("https://www.instagram.com/" + user1 + "/?__a=1")
            .then((response) => response.json())
            .then((responseJson) => {
                var json1 = responseJson;
                fetch("https://www.instagram.com/" + user2 + "/?__a=1")
                    .then((response) => response.json())
                    .then((responseJson) => {
                        var json2 = responseJson;
                        console.log(json2.graphql.user);
                        me.getWinner(json1.graphql, json2.graphql);
                        this.updateHistory();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    challenge(user1) {
        let me = this;
        fetch("https://www.instagram.com/" + user1 + "/?__a=1")
            .then((response) => response.json())
            .then((responseJson) => {
                var json1 = responseJson;
                fetch("fighters/champion")
                    .then((response) => response.json())
                    .then((responseJson) => {
                        var json2 = responseJson;
                        me.getWinnerChallenge(json1.graphql, json2);
                        this.updateHistory();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {
        if (this.state.mode === 0) {
            return (

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title"><strong>InstaFight</strong>
                            <button className="btn btn-primary button" onClick={
                                () => {
                                    this.setState({mode: 1, user1: {}, user2:{}});
                                }
                            }>Challenge the champion!
                            </button>
                        </h1>
                    </header>
                    <br/>
                    <div>
                        <p className="text-center">
                            Welcome to InstaFights! Input two instagram usernames and the one with the most likes wins!
                        </p>
                    </div>
                    <Search executeQuery={this.executeQuery.bind(this)}></Search>
                    <br/>
                    <div className="container">
                        <Results user1={this.state.user1} user2={this.state.user2}></Results>
                    </div>
                    <br/>
                    <div className="container">
                        <History history={this.state.history}/>
                    </div>
                </div>
            );
        }
        else {
            return (

                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title"><strong>InstaFight</strong>
                            <button className="btn btn-primary button" onClick={
                                () => {
                                    this.setState({mode: 0, user1: {}, user2:{}});
                                }
                            }>Back to standard mode
                            </button>
                        </h1>
                    </header>
                    <br/>
                    <div>
                        <p className="text-center">
                            This is the challenge mode, try to beat the current champion!
                        </p>
                    </div>
                    <SearchChampion challenge={this.challenge.bind(this)}></SearchChampion>
                    <br/>
                    <div>
                        <ResultsChallenge user1={this.state.user1} user2={this.state.user2}></ResultsChallenge>
                    </div>
                    <div>
                        <History history={this.state.history}/>
                    </div>

                </div>
            );
        }
    }

}

export default App;
