import React,{Component} from 'react';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchChats,fetchContacts,postChat,postContact,postFile,
    postChangeUsername,deleteChat,deleteContact,loginUser,logoutUser,
    signupUser,ErrorMess,Set_default} from '../redux/ActionCreators';

import { matchPath } from 'react-router'
/*
import Header from './HeaderComponent';*/

const mapStateToProps = state => {
    return {
        chats:state.chats,
        contacts:state.contacts,
        errorMess:state.errorMess,
        auth:state.auth,
        file:state.file
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchChats: (receiver) => {dispatch(fetchChats(receiver))},
    fetchContacts: () => {dispatch(fetchContacts())},
    postChat: (receiver, message,data,title,File) => dispatch(postChat(receiver, message,data,title,File)),
    postContact: (username) => dispatch(postContact(username)),
    deleteChat: (_ID) => dispatch(deleteChat(_ID)),
    deleteContact: (_ID) => dispatch(deleteContact(_ID)),
    loginUser: (creds) => dispatch(loginUser(creds)),
    logoutUser: () => dispatch(logoutUser()),
    signupUser: (username,password,firstname,lastname) => dispatch(signupUser(username,password,firstname,lastname)),
    postChangeUsername: (newUsername) => dispatch(postChangeUsername(newUsername)),
    postFile: (formadata, receiver, message,data,title) => dispatch(postFile(formadata, receiver, message,data,title)),
    Set_default:()=>dispatch(Set_default()),
    ErrorMess:(message)=>dispatch(ErrorMess(message))
  });

  class Main extends Component {

    /*componentDidMount() {
      this.props.fetchChats();
      this.props.fetchContacts();
      document.title="Chat App";
    }
    
    componentDidUpdate(){
        this.props.fetchChats();
    }*/


    render() {
    return (
        <div>
            <b>Hello</b>
        </div>
        ); 
    }
  }
  
  //export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
  export default Main;