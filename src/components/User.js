import React, {Component} from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        console.log("doing nothing")
        /*this.state = {
            userId: '',
            user: '',
            userName: ''
        };

    this.userName = this.props.userName*/
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    handleSignIn(e) {
        e.preventDefault();
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider ).then(function(result) {
            // The signed-in user info.
            var user = result.user;
        return user
          })
 
    }

    handleRoomClick(room) {


        this.activeRoom = room;  
   
       
       }

    handleSignOut(e) {
        e.preventDefault();
        this.props.firebase.auth().signOut();
    }

    render() {
        return (
            <div className="authentication">
                <div className="sign-in-button">
                    <button
                        type="submit"
                        onClick={(e) => this.handleSignIn(e)}>
                        Sign In
                    </button>
                </div>
                <div className="sign-out-button">
                    <button
                        type="submit"
                        onClick={ (e) => this.handleSignOut(e)}>
                        Sign Out
                        </button>
                </div>
                <div className="user-information">
                    <h2>Your user name is:</h2>
                    <h3>{this.props.user !=null ? this.props.user.displayName : "guest"}</h3>
                </div>
            </div>
        );
    }
}

export default User;