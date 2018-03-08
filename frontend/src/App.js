import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Results from './Results';

class App extends Component {
   constructor(props){
       super(props);

       this.state = {
           user1: [],
           user2: [],
           error: ""
       }
   }

    executeQuery(user1, user2){
       console.log(user1);
       console.log(user2)

        fetch("https://www.instagram.com/"+user1+"/?__a=1")
            .then((response) => response.json())
            .catch((error)=>console.log("mal"))
            .then((responseJson) => {
                var json1=responseJson;
                fetch("https://www.instagram.com/"+user2+"/?__a=1")
                    .then((response) => response.json())
                    .then((responseJson) => {
                        var json2=responseJson;
                        this.setState({
                            user1: json1,
                            user2: json2
                        });
                        console.log(this.state);
                    })
                    .catch((error) => {
                        console.log("mal1");
                    });
            })
            .catch((error) => {
                console.log("mal2");
            });
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">InstaFight</h1>
        </header>
          <br/>
          <div className="col-md-10">
              <p>Welcome to InstaFights! Input two instagram usernames and the one with the most likes wins!</p>
          </div>
          <Search executeQuery={this.executeQuery.bind(this)}></Search>
          <br/>
          <Results usuario1={this.state.user1} usuario2={this.state.user2}/>
      </div>
    );
  }
}

export default App;
