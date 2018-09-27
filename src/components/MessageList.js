import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            roomId: ''
        };

    this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
        console.log('child added');
        const message = snapshot.val();
        message.key = snapshot.key;
        
        this.setState({ messages: this.state.messages.concat( message ) });
        });
    }




    /*createMessage(e) {
        const newMessageContent = this.state.newMessageContent
        if (!this.state.newMessageName) {return}
        const newMessage = {name: this.state.newMessageContent};
        this.setState({ messages: [...this.state.messages, newMessage], newMessageContent: ''})
        this.messagesRef.push({
            content: newMessageContent
        });
    }*/

    handleChange(e) {
        console.log(e)
        this.setState({ newMessageContent: e.target.value })
    }

    render() {
        return(
            <div className="message-list">
                <div className="messages-by-room">
                    <h1>{this.props.activeRoom.name}</h1>
                    <section>
                        {/*table containing message information*/}
                        <table id="message-info">
                            <thead>
                                <tr>
                                    <th>Message Room ID</th>
                                    <th>Message User ID</th>
                                    <th>Message Content</th>
                                    <th>Time of Creation</th>
                                </tr>
                            </thead>
                            <tbody>
                            {   // eslint-disable-next-line
                                this.state.messages.filter( (message) => message.roomId==this.props.activeRoom.key).map((message) => 
                                <tr className="message" key={message.key}>
                                <td>{message.roomId}</td>
                                <td>{message.userId}</td>
                                <td>{message.content}</td>
                                <td>{message.sentAt}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </section>
                </div>
                {/*render form to add new message to a chat room*/}
                <div className="add-message-form">
                    <form onSubmit={ (e) => this.createMessage(e) }>
                            <fieldset>
                                <legend>Create a new message</legend>
                                What is your user name?
                                <input type="text" value={ this.state.userId } ></input><br/>
                                In which chat room would you like to add a message?
                                <input type="text" value={ this.state.roomId } ></input><br/>
                                What do you want your new message to say?
                                <input type="text" value={ this.state.content } onChange= { (e) => this.handleChange(e) } ></input>
                                <input type="submit"></input>
                            </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessageList;