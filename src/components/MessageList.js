import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessageName: ''
        };
    this.roomsRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            const message = snapshot.val();
            room.messages.key = snapshot.key;
            this.setState( {messages: this.state.rooms.messages.concat( message ) });
        })
    }

    /*createMessage(e) {
        const newMessageContent = this.state.newMessageContent
        if (!this.state.newMessageName) {return}
        const newMessage = {name: this.state.newMessageName};
        this.setState({ messages: [...this.state.rooms.messages, newMessage], newMessageName: ''})
        this.roomsRef.room.message.push({
            name: newMessageName
        });
    }*/

    handleChange(e) {
        console.log(e)
        this.setState({ newMessageName: e.target.value })
    }

    render() {
        return(
            <div className="message-list">
                <div>
                    <ol>
                        {this.state.messages.map((messages) =>
                        <p key={messages.key}>{messages.roomId} {messages.content}</p>)}
                    </ol>
                </div>
                <div className="add-message-form">
                    <form onSubmit={ (e) => this.createMessage(e) }>
                    What is your user name?
                    <input type="text" value={ this.state.userId } ></input><br/>
                    In which chat room would you like to add a message?
                    <input type="text" value={ this.state.roomId } ></input><br/>
                    What do you want your new message to say?
                    <input type="text" value={ this.state.content } onChange= { (e) => this.handleChange(e) } ></input>
                    <input type="submit"></input>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList;