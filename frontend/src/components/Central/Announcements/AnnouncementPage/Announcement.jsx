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
                <h4> <span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3'}}>Эълонлар</strong></h4><hr/>
                {announcements.map(announcement => {
                    return (
                        <div className='container' key={announcement.announcement_id}>
                            <div className='row'>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4 style={{ color: '#0093d3' }} className="h4"><span style={{color: 'rgb(241, 159, 77)'}} className='glyphicon glyphicon-bullhorn'></span> {announcement.title}</h4>
                                    </div>
                                    <div className="panel-body">
                                        <div className='col-sm-12 text-justify'>
                                            <p>{announcement.announcement}</p>
                                        </div>
                                        <div className='col-sm-12'>
                                            <div className='row'>
                                                <div className='col-sm-6 text-left'>
                                                    <h5 style={{ color: "grey" }}><i className="fa fa-pencil" aria-hidden="true"></i>
                                                        &nbsp;{announcement.fullname}</h5>
                                                </div>
                                                <div className='col-sm-6 text-right'>
                                                    <span style={{ color: "grey", fontSize: "10px" }} className='glyphicon glyphicon-time'>
                                                        &nbsp;{Moment(announcement.announ_timestamp).format("LLLL")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
