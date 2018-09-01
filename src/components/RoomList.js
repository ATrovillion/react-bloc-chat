import React, {Component} from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rooms: [],
          newRoomName: ''
        };
    
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.newRoomName = this.props.newRoomName
      }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });

    }

    createRoom(e) {
        const newRoomName = this.state.newRoomName
        if (!this.state.newRoomName) {return}
        const newRoom = {name: this.state.newRoomName};
        this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: ''})
        this.roomsRef.push({
            name: newRoomName
        });   
    }


    handleChange(e) {
        console.log(e)
        this.setState({ newRoomName: e.target.value })
      }



    render() {
        return(
        <div className="room-list">    
            <div>
                <ol>
                    {this.state.rooms.map((room) =>
                    <p key={room.key}>{room.name}</p>)}
                </ol>
            </div>
            <div className='add-room-form'>
                <form onSubmit={ (e) => this.createRoom(e) }>
                    Name of new chat room:
                    <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } ></input>
                    <input type="submit"></input>
                </form>
            </div>
        </div>
        )
    }

}

export default RoomList;