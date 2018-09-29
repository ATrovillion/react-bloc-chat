import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            roomId: '',
            newMessageContent: '',
            errorMessage: 'Please choose a chat room before creating messages!'
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




    createMessage(e) {
        e.preventDefault()
        if (this.props.activeRoom !== -1) {
            const newMessageContent = this.state.newMessageContent
            if (!this.state.newMessageContent) {return}
            const newMessage = {content: this.state.newMessageContent};
            this.setState({ messages: [...this.state.messages, newMessage], newMessageContent: ''})
            this.messagesRef.push({
                content: newMessageContent,
                userId: this.props.user.displayName,
                roomId: this.props.activeRoom.key,
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
            });}
    }

    handleChange(e) {
        console.log(e)
        this.setState({ newMessageContent: e.target.value })
    }

    render() {
        return(
            <div className="message-list">
                <div className="messages-by-room">
                    <h1>{this.props.activeRoom !==-1 ? this.props.activeRoom.name : "Please choose a chat room"}</h1>
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
                        <form onSubmit={ (e) => this.createMessage(e)}>
                            <fieldset>
                                <legend>Create a new message</legend>
                                What do you want your new message to say?
                                <input type="text" value={ this.state.newMessageContent } onChange= { (e) => this.handleChange(e) } ></input>
                                <input type="submit"></input>
                            </fieldset>
                    </form>
                    {this.props.activeRoom===-1 ? <h1>{this.state.errorMessage}</h1> : <h1>Ready to create a new message!</h1> }
                </div>
            </div>
        )
    }
}

export default MessageList;