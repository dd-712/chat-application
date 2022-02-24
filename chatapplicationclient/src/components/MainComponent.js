import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    postChat, postContact, postFile,
    postChangeUsername, deleteChat, deleteContact, loginUser, logoutUser,
    signupUser
} from '../redux/ActionCreators';
import { curUrl } from '../shared/baseUrl';

import './styles.css';

import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";
import Combine from './combineComponent';


const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postChat: (receiver, message, data, title, File) => dispatch(postChat(receiver, message, data, title, File)),
    postContact: (_id, username, roomId) => dispatch(postContact(_id, username, roomId)),
    deleteChat: (_ID) => dispatch(deleteChat(_ID)),
    deleteContact: (_ID1, _ID2) => dispatch(deleteContact(_ID1, _ID2)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    signupUser: (username, password, firstname, lastname) => dispatch(signupUser(username, password, firstname, lastname)),
    postChangeUsername: (newUsername) => dispatch(postChangeUsername(newUsername)),
    postFile: (formadata, receiver, message, data, title) => dispatch(postFile(formadata, receiver, message, data, title)),
  
});


class Main extends Component {
    render() {
        let Valid = this.props.auth.isAuthenticated;
        //console.log(Valid);
        
        if (!Valid) {
            if(window.location.href==curUrl+"user")
            {window.location.href=curUrl+"login"};
            return (
                <div className='mainComponentDiv'>
                    <Header auth={this.props.auth} logoutUser={this.props.logoutUser} />
                    <Route exact path="/login" component={() => <Login loginUser={this.props.loginUser} />} />
                    <Route exact path="/signup" component={() => <Signup signupUser={this.props.signupUser} />} />
                </div>
            );
        } else {
            if(window.location.href!=curUrl+"user")
            {window.location.href=curUrl+"user"};
            return (
                <div className='mainComponentDiv'>
                    <Route path="/user" component={() => <Combine auth={this.props.auth}
                        logoutUser={this.props.logoutUser}
                        postContact={this.props.postContact}
                        deleteContact={this.props.deleteContact}
                        deleteChat={this.props.deleteChat}
                        postChat={this.props.postChat}
                        postFile={this.props.postFile}
                        chats={this.props.chats}
                        
                    />}
                    />
                </div>

            );
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
//export default Main;
