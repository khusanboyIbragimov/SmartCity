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
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0 ? this.props.userInfo[0].username : ""
        socket.emit(LOGOUT, username);
    }

    render() {
        const { announcements } = this.state;
        return (
            <div>
                <h4> <span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3' }}>Эълонлар</strong></h4><hr />
                <div className='container' >
                <div class="row">
                {announcements.map(announcement => {
                    return (
                            <div>
<div class="col-sm-4" key={announcement.announcement_id}>
                                    <div class="card">
                                        <div class="avatar">
                                            <img className='annon_img' src="https://scontent-frt3-2.cdninstagram.com/vp/3ca2fb4fd8fb9e90234d42da07f63fed/5C505CC9/t51.2885-15/e35/41349438_869720689897963_6915892188155667819_n.jpg" alt="" />
                                        </div>
                                        <div class="content">
                                            <p class="personName">{announcement.fullname}</p>
                                            <p className='title'><span style={{ color: 'rgb(241, 159, 77)' }} className='glyphicon glyphicon-bullhorn'></span> {announcement.title}</p>
                                            <p class="text_box">{announcement.announcement} </p>
                                                <p className='text-right' id='time'><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{Moment(announcement.announ_timestamp).format("LLLL")}</p>              
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                           
                         
                       
                    )
                })}
                </div>
                <hr/>
                </div>
            </div>
        )
    }
}
