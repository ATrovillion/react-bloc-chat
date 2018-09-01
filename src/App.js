import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDIAxD7B0TpsiTGxmWjyzrx_OotCDZtSTA",
  authDomain: "bloc-react-chat.firebaseapp.com",
  databaseURL: "https://bloc-react-chat.firebaseio.com",
  projectId: "bloc-react-chat",
  storageBucket: "bloc-react-chat.appspot.com",
  messagingSenderId: "1005103712063"
};

firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: RoomList
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="rooms-list">
          <RoomList
            firebase={firebase}
           />
        </div>
        <div className="message-list">
          <MessageList
            firebase={firebase}
          />
        </div>
      </div>
    );
  }
}

export default App;