import React from "react";
import axios from 'axios';
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
// const socketUrl = "http://localhost:3100";
var Moment = require("moment");
// require('moment/locale/uz');

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
            .then((res) => {
                this.setState({
                    announcements: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io();
        let username = this.props.userInfo.length > 0 ? this.props.userInfo[0].username : ""
        socket.emit(LOGOUT, username);
    }

    render() {
        const { announcements } = this.state;
        return (
            <div>
                <h4> <span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3' }}>Announcements</strong></h4><hr />
                <div className='container' >
                    <div  className="row ">
                        {announcements.map(announcement => {
                            return (

                                    <div className="col-sm-4" key={announcement.announcement_id}>
                                        <div className="card" >
                                            <div className="avatar">
                                                <img className='annon_img' src={announcement.user_imgurl} alt="" />
                                            </div>
                                            <div className="content">
                                                <p className="personName">{announcement.fullname}</p>
                                                <p className='title'><span style={{ color: 'rgb(241, 159, 77)' }} className='glyphicon glyphicon-bullhorn'></span> {announcement.title}</p>
                                                <p className="text_box">{announcement.announcement} </p>
                                                <footer id='footer'><p className='text-right' id='time'><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{Moment(announcement.announ_timestamp).format("LLLL")}</p></footer>
                                            </div>
                                        </div>
                                    </div>

                            )
                        })}
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}
