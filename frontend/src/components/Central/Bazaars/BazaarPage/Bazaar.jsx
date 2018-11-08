import React from "react";
import axios from "axios";
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
import { Link } from 'react-router-dom'
import './Bazaar.css'
const socketUrl = "http://localhost:3100";
var Moment = require("moment");
require('moment/locale/uz');

export default class Bazaar extends React.Component {
    constructor() {
        super();
        this.state = {
            my_rent_items: [],
            my_sale_items: [],
            my_services: [],
            allInOne: []
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/get_all_rent_items")
            .then((res) => {
                this.setState({
                    allInOne: [...this.state.allInOne, ...res.data],
                    my_rent_items: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
        axios
            .get("/users/get_all_sale_items")
            .then((res) => {
                this.setState({
                    allInOne: [...this.state.allInOne, ...res.data],
                    my_sale_items: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
        axios
            .get("/users/get_all_services")
            .then((res) => {
                this.setState({
                    allInOne: [...this.state.allInOne, ...res.data],
                    my_services: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0 ? this.props.userInfo[0].username : ""
        socket.emit(LOGOUT, username)
    }

    handleChange = (e) => {
        const { my_rent_items, my_sale_items, my_services } = this.state;
        if (e.target.value === "all") {
            this.setState({
                allInOne: [...my_rent_items, ...my_sale_items, ...my_services]
            })
        } else if (e.target.value === "rent") {
            this.setState({
                allInOne: [...my_rent_items]
            })
        } else if (e.target.value === "sale") {
            this.setState({
                allInOne: [...my_sale_items]
            })
        } else if (e.target.value === "service") {
            this.setState({
                allInOne: [...my_services]
            })
        }
    }

    render() {
        const { allInOne } = this.state;
        // var title = '';
        return (
            <div className='container'>
                <h4><span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3' }}>Бозор</strong></h4>
                <div id="pricing" className="container-fluid">
                    <div className="text-center">
                        <select onChange={this.handleChange} style={{ borderColor: '#0093d3' }}>
                            <option value="">сайлаш</option>
                            <option value="all">хаммаси</option>
                            <option value="rent">ижара</option>
                            <option value="sale">сотув</option>
                            <option value="service">хизматлар</option>
                        </select><br /><br />
                    </div>
                    <div className="row slideanim">
                        {allInOne.map((ele) => {
                            // if (ele.title.length > 13) {
                            //     title = ele.title.substring(0, 12) + "...";
                            // } else {
                            //    title = ele.title
                            // }
                            return (
                                <div key={Math.random()}>
                                    <Link to={`/sc/bazaar/${ele.item_id || ele.service_id}/${ele.section}`}>
                                        <div className="col-sm-3 col-xs-12">
                                            <div className="panel panel-default text-center listing listing-radius listing-success">
                                                <div className="shape">
                                                    {ele.section && ele.section === "sale" ? <div className="shape-text">сотилади</div> : ""}
                                                    {ele.section && ele.section === "rent" ? <div className="shape-text">ижара</div> : ""}
                                                    {ele.section && ele.section === "service" ? <div className="shape-text">хизмат</div> : ""}
                                                </div>
                                                <div className="panel-heading">
                                                    {ele.section && ele.section === "service" ? <h4 className='text-left' id='title'><i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-wrench" aria-hidden="true"></i> {ele.title}</h4> : ""}
                                                    {ele.section && ele.section === "rent" ? <h4 className='text-left' id='title'><i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-handshake-o" aria-hidden="true"></i> {ele.title}</h4> : ""}
                                                    {ele.section && ele.section === "sale" ? <h4 className='text-left' id='title'><i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-shopping-cart" aria-hidden="true"></i> {ele.title}</h4> : ""}

                                                </div>
                                                <div className="panel-body">
                                                    {ele.item4sale_imgurl ? <img src={ele.item4sale_imgurl} alt="sotiladigan narsani surati" style={{ height: "200px", width: "100%" }} /> : ""}
                                                    {ele.item4rent_imgurl ? <img src={ele.item4rent_imgurl} alt="arendniy surati" style={{ height: "200px", width: "100%" }} /> : ""}
                                                    {ele.service_imgurl ? <img src={ele.service_imgurl} alt="hizmat surati" style={{ height: "200px", width: "100%" }} /> : ""}
                                                </div>
                                                <div className="panel-footer">
                                                    <h4 className='text-left' id="price"><i className="fa fa-money" aria-hidden="true"></i>&nbsp;{ele.price}{" "}<span id='somon'>сомони</span></h4>
                                                    <p className='text-right' id='time'><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{Moment(ele.item_timestamp).format("LLLL")}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

