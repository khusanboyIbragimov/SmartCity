import React from "react";
import io from 'socket.io-client';
import { LOGOUT } from '../components/Central/Giychat/Events';
import { Link } from "react-router-dom";
// const socketUrl = "http://localhost:3100";
const photo = require('./logo2.png');

export default class Home extends React.Component {

    componentDidMount() {
        this.logout();
    }

    logout = () => {
        const socket = io();
        let username = this.props.userInfo.length > 0 ? this.props.userInfo[0].username : ""
        socket.emit(LOGOUT, username);
    }

    render() {
        return (
            <div>
                <b><h4> Welcome to <span style={{ color: "#0093d3" }}>SmartCity!</span></h4></b>
                <div className="wizard container-fluid">
                    <div className="wizard-inner">
                        <div className="connecting-line"></div>
                        <ul className="nav nav-tabs" role="tablist">

                            <li role="presentation" className="disabled"  >
                                <Link to='/sc/news'>
                                    <span href="#step1" role="tab" title="Step 1">
                                        <span className="round-tab">
                                            <i className='glyphicon glyphicon-globe nav-icons'></i>
                                        </span>
                                    </span>
                                </Link>
                            </li>

                            <li role="presentation" className="disabled"  >
                                <Link to='/sc/announcement'>
                                    <span href="#step2" role="tab" title="Step 2">
                                        <span className="round-tab">
                                            <i className='glyphicon glyphicon-bullhorn nav-icons'></i>
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li role="presentation" className="disabled" >
                                <Link to='/sc/ratings'>
                                    <span href="#step3" role="tab" title="Step 3">
                                        <span className="round-tab">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li role="presentation" className="disabled" >
                                <Link to='/sc/survey'>
                                    <span href="#step4" role="tab" title="Step 4">
                                        <span className="round-tab">
                                            <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li role="presentation" className="disabled" >
                                <Link to='/sc/bazaar'>
                                    <span href="#step5" role="tab" title="Step 5">
                                        <span className="round-tab">
                                            <i className="glyphicon glyphicon-usd"></i>
                                        </span>
                                    </span>
                                </Link>
                            </li>
                            <li role="presentation" className="disabled" >
                                <Link to='/sc/giychat'>
                                    <span href="#complete" role="tab" title="Complete">
                                        <span className="round-tab">
                                            <i className="fa fa-users" aria-hidden="true"></i>
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <b><h5><i style={{ color: 'rgb(241, 159, 77)' }} className="fa fa-info-circle" aria-hidden="true"></i>
                    &nbsp;What does SmartCity means.</h5></b>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12  col-xs-12'>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>A smart city is a municipality that uses information and communication technologies to increase operational efficiency, share information with the public and improve both the quality of government services and citizen welfare.
                                 </p><p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>Theoretically, any area of city management can be incorporated into a smart city initiative</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>Smart city initiatives must include the people it aims to help: its residents,
                            businesspeople and visitors. City leaders must not only raise awareness of the benefits of the smart city technologies being implemented,
                            but also promote the use of open, democratized data to its citizens. If people know what they are participating in and the benefits it
                            can bring, they are more likely to engage. Therefore using our smartratings, smartsurveys, smartnews you will be able to change quality of stores, restaraunts, banks, school, etc thru voting system.</p>
                            <b><h5><i style={{ color: 'rgb(241, 159, 77)' }} className="fa fa-info-circle" aria-hidden="true"></i>
                                &nbsp;How to use this website.</h5></b>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>1. We encourage you to create an <Link to='/sc/register'>account </Link> for the full access to the Website.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2. After you create an account you will be able to see five buttons in your own profile<span style={{ textIndent: '2px' }} className="glyphicon glyphicon-user nav-icons"></span>&nbsp;<button className='btn btn-default btn-xs'>my news</button>, <button className='btn btn-default btn-xs'>my announcements</button>, <button className='btn btn-default btn-xs'>my ratings</button>, <button className='btn btn-default btn-xs'>my surveys</button>, <button className='btn btn-default btn-xs'>my bazaar</button>.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.1.  <button className='btn btn-default btn-xs'><i className='glyphicon glyphicon-globe'></i> my news</button> clicking this button you will be able to share your news and get result how much true or false thru voting system (you can delete anytime you want)</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.2. <button className='btn btn-default btn-xs'><i className='glyphicon glyphicon-bullhorn'></i> my announcements</button> clicking this button you will be able to leave your announcement (you can delete anytime you want).</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.3. <button className='btn btn-default btn-xs'><i className="fa fa-star" aria-hidden="true"></i> my ratings</button> clicking this button you will be able to get quality of any service place you would like to know thru ratings algorigthm system </p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.4. <button className='btn btn-default btn-xs'><i className="fa fa-bar-chart" aria-hidden="true"></i> my surveys</button> clicking this button you may ask any survey question with the options and get the results as soon as possible.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.5. <button className='btn btn-default btn-xs'><i className="glyphicon glyphicon-usd"></i> my bazaar</button> clicking this button you will be able to sell, rent your items, also sell your services</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.6. <button className='btn btn-default btn-xs'><i className="fa fa-users" aria-hidden="true"></i> chat</button> visiting our chat service you can enjoy chatting with your countryman.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
