import React from "react";
import axios from "axios";
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
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
            .then( (res) => {
                this.setState({
                    allInOne: [...this.state.allInOne, ...res.data],
                    my_rent_items: res.data
                })
            })
            .catch( err => {
                console.log(err);
            })
        axios
            .get("/users/get_all_sale_items")
            .then( (res) => {
                this.setState({
                    allInOne: [...this.state.allInOne, ...res.data],
                    my_sale_items: res.data
                })
            })
            .catch( err => {
                console.log(err);
            })
        axios
            .get("/users/get_all_services")
            .then( (res) => {
                this.setState({
                    allInOne: [...this.state.allInOne, ...res.data],
                    my_services: res.data
                })
            })
            .catch( err => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0? this.props.userInfo[0].username:""
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
        return(
            <div className='container'>
             Бозор
                <select onChange={this.handleChange}>
                    <option value="">сайлаш</option>
                    <option value="all">хаммасини сайлайман</option>
                    <option value="rent">ижарани сайлайман</option>
                    <option value="sale">сотиб-олишни сайлайман</option>
                    <option value="service">хизматларни сайлайман</option>
                </select>
                {allInOne.map( (ele) => {
                     return(
                         <div >
                         <div key={Math.random()}  className='row'>
                         <div className='col-sm-12'>
                         <div className='row'>
            <div className='col-sm-3'>
            <div className='row'>
            <div className='col-sm-12'>
            <h6><span>Сарлавха:{" "}</span>{ele.title}</h6>
            </div>
            </div>
            <div className='row'>
            <div className='col-sm-12'>
                    img
            </div>
            </div>
            <div className='row'>
            <div className='col-sm-12'>
            <p><span>нархи:{" "}</span>{ele.price}</p>
            </div>
            </div>
            <div className='row'>
            <div className='col-sm-12'>
            <p><span>тушунтириш:{" "}</span>{ele.description}</p>

            </div>
            </div>
            <div className='row'>
            <div className='col-sm-12'>
            <p><span>тулиқ исми:{" "}</span>{ele.fullname}</p>
            </div>
            </div>
            <div className='row'>
            <div className='col-sm-12'>
                    tel nomeri
            </div>
            </div>
            <div className='row'>
            <div className='col-sm-12'>
                    data
            </div>
            </div>
            </div>

            </div>
                         </div>
                         </div>

                         </div>
            
                )
            })}
                Бозор
                <select onChange={this.handleChange}>
                    <option value="">сайлаш</option>
                    <option value="all">хаммасини сайлайман</option>
                    <option value="rent">ижарани сайлайман</option>
                    <option value="sale">сотиб-олишни сайлайман</option>
                    <option value="service">хизматларни сайлайман</option>
                </select>
                <ul>
                    {allInOne.map( (ele) => {
                        return(
                            <div key={Math.random()}>
                            <h6><span>Сарлавха:{" "}</span>{ele.title}</h6>
                            <p><span>тушунтириш:{" "}</span>{ele.description}</p>
                            <p><span>нархи:{" "}</span>{ele.price}</p>
                            {ele.condition? <p><span>аҳволи:{" "}</span>{ele.condition}</p>:""}
                            {ele.item4sale_imgurl?<img src={ele.item4sale_imgurl} alt="sotiladigan narsani surati" style={{height: "100", width: "100px"}} />:""}
                            {ele.item4rent_imgurl?<img src={ele.item4rent_imgurl} alt="arendniy surati" style={{height: "100", width: "100px"}} />:""}
                            {ele.service_imgurl?<img src={ele.service_imgurl} alt="arendniy surati" style={{height: "100", width: "100px"}} />:""}
                            <p><span>тулиқ исми:{" "}</span>{ele.fullname}</p>
                            <h6><span>телефон номери:{" "}</span>{ele.phone_number}</h6>
                            <p>{Moment(ele.item_timestamp).format("LLLL")}</p>
                            <p>****************************************************************</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

