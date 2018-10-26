// import React from "react";
// import axios from 'axios';
// import io from "socket.io-client";


// export default class Giychat extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: "",
//             message: "",
//             messages: [],
//             userInfo: [],
//         }
//         this.socket = io('http://localhost:3000');
//         this.socket.on('RECEIVE_MESSAGE', (data) => {
//             this.addMessage(data);
//         })
       
//     }

//     logOut = () => {
//         this.socket.on('user:left', (data) => {
//             this.socket.emit("SEND_MESSAGE", {
//                 message: this.state.userInfo[0].username + " has left"
//             })
//         })
//     }

//     componentDidMount() {
//         axios   
//             .get("/users/userInfo")
//             .then( res => {
//                 this.setState({
//                     userInfo: res.data
//                 })
//             })
//             .catch( err => {
//                 console.log(err);
//             })
//     }

//     addMessage = data => {
//         this.setState({
//             messages: [...this.state.messages, data]
//         })
//     }

//     sendMessage = e => {
//         e.preventDefault();
//         this.socket.emit("SEND_MESSAGE", {
//             message: this.state.message
//         })
//         this.setState({
//             message: ""
//         })
//     }

//     handleInput = e => {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }

//     render() {
//         return (
//             <div>
//                 Welcome to Giychat!
//                 <ul>
//                     {this.state.messages.map( ele => {
//                         return(
//                             <div>{this.state.userInfo[0] !== undefined? this.state.userInfo[0].username:""}{": "}{ele.message}</div>
//                         )
//                     })}
//                 </ul>
//                 <textarea 
//                     onChange={this.handleInput} 
//                     type="text"  name="message" 
//                     value={this.state.message}
//                 /><br/>
//                 <button onClick={this.sendMessage}>send</button>
//             </div>
//         )
//     }
// }


import React, { Component } from 'react';
import Layout from './components/Layout';
import "./giychat.css"
class Giychat extends Component {
  render() {
    return (
        <Layout />
    );
  }
}

export default Giychat;
