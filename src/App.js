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
      rooms: RoomList,
      messages: MessageList,
      activeRoom: -1
    }
  }

  handleActiveRoom(room) {
      this.setState( { activeRoom: room} )
      console.log(room)
      console.log(room.key)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="rooms-list">
          <RoomList
            firebase={firebase}
            handleActiveRoom={(room) => this.handleActiveRoom(room)}
           />
        </div>
        <div className="message-list">
        {/*conditionally render h1 tag with title of activeRoom*/}
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
          />
        </div>
      </div>
    );
  }
}

export default App;