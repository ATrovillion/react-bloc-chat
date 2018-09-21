import React, {Component} from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rooms: [],
          newRoomName: ''
        };
    
      this.roomsRef = this.props.firebase.database().ref('rooms');
      this.newRoomName = this.props.newRoomName;
      this.activeRoom = this.props.room
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

    handleRoomClick(room) {

     this.props.handleActiveRoom(room)
     this.activeRoom = room;  

    
    }

    handleChange(e) {
        console.log(e)
        this.setState({ newRoomName: e.target.value })
      }



    render() {
        return(
        <div className="room-list">    
            <div>
                <ol className="roomName">
                    {this.state.rooms.map((room) =>
                            <div key={room.key} onClick={() => this.handleRoomClick(room)}>{room.name}</div>
                    )}
                </ol>
            </div>
            <div className='add-room-form'>
                <form onSubmit={ (e) => this.createRoom(e) }>
                    <fieldset>
                        <legend>Create a new chat room</legend>
                        Name of new chat room:
                        <input type="text" value={ this.state.newRoomName } onChange={ (e) => this.handleChange(e) } ></input>
                        <input type="submit"></input>
                    </fieldset>
                </form>
            </div>
        </div>
        )
    }

}

export default RoomList;