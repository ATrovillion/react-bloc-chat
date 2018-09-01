import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const message = snapshot.val();
            room.message.key = snapshot.key;
            this.setState( {messages: this.state.rooms.messages.concat( message ) });
        })
    }

    createMessage(e) {
        const newMessageName = this.state.newMessageName
        if (!this.state.newMessageName) {return}
        const newMessage = {name: this.state.newMessageName};
        this.setState({ messages: [...this.state.rooms.messages, newMessage], newMessageName: ''})
        this.roomsRef.room.message.push({
            name: newMessageName
        });
    }

    handleChange(e) {
        console.log(e)
        this.setState({ newMessageName: e.target.value })
    }

    render() {
        return(
            <div className="message-list">
                <div>
                    <ol>
                        {this.state.rooms.message.map((message) =>
                        <p key={message.key}>{message.name}</p>)}
                    </ol>
                </div>
                <div className="add-message-form">
                    <form onSubmit={ (e) => this.createMessage(e) }>
                    Which chat room would you like to add a message in?
                    <input type="text" value={ this.state.roomId }
                    Title of new message:
                    <input type="text" value={ this.state.newMessageName } onChange= { (e) => this.handleChange(e) } ></input>
                    <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList;