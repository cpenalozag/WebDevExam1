import React, { Component } from 'react';
import './App.css';
import Search from './Search';

class App extends Component {
   constructor(props){
       super(props);

       this.state = {
           list: []
       }
   }

    executeQuery(user1, user2){
       console.log(user1);
       console.log(user2)
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">InstaFigth</h1>
        </header>
          <Search executeQuery={this.executeQuery.bind(this)}></Search>
      </div>
    );
  }
}

export default App;
