import React from "react";
import axios from 'axios';
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
const socketUrl = "http://localhost:3100";
var Moment = require("moment");
require('moment/locale/uz');

export default class Announcement extends React.Component {
 
    constructor() {
        super();
        this.state = {
            announcements: []
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/getallannouncements")
            .then( (res) => {
                this.setState({
                    announcements: res.data
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

	logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0? this.props.userInfo[0].username:""
        socket.emit(LOGOUT, username);
	}




    render() {
        const { announcements } = this.state;
        return(
            <div>
                <h3>Эълонлар!</h3>
                <hr/>
                <ul>
                {announcements.map( announcement => {
                       return(
                            <div key={announcement.announcement_id}>
                                <h4>{announcement.title}</h4>
                                <p>{announcement.announcement}</p>
                                <p>{announcement.fullname}</p>
                                <p>{Moment(announcement.announ_timestamp).format("LL")}</p>
                                <hr/>
                            </div>
                        )
                })}
                </ul>
            </div>
        )
    }
}
