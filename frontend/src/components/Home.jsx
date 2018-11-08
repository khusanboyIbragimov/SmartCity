import React from "react";
import axios from 'axios';
import io from 'socket.io-client';
import { LOGOUT } from '../components/Central/Giychat/Events';
// import StarRatings from 'react-star-ratings';
const socketUrl = "http://localhost:3100";
// var Moment = require("moment");
require('moment/locale/uz');
const photo = require('./logo2.png');

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            news: [],
            surveyQuestion: [],
            announcements: []
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/getallnews")
            .then((res) => {
                this.setState({
                    news: res.data.slice(0, 3)
                })
            })
            .catch((err) => {
                console.log(err);
            })
        axios
            .get("/users/get_all_surveys")
            .then((res) => {
                this.setState({
                    surveyQuestion: res.data ? res.data.slice(0, 1)[0] : ""
                })
            })
            .catch((err) => {
                console.log(err);
            })
        axios
            .get("/users/getallannouncements")
            .then((res) => {
                this.setState({
                    announcements: res.data ? res.data[0] : ""
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
        // const { news, surveyQuestion, announcements } = this.state;
        // let avg = surveyQuestion ? surveyQuestion.avg : 0;
        return (
            <div>
                <b><h4><img alt="" style={{height: '22px'}} src={photo}/>га Хуш келибсиз азиз хамқишлоқлар!</h4></b>
                <div class="wizard">
                    <div class="wizard-inner">
                        <div class="connecting-line"></div>
                        <ul class="nav nav-tabs" role="tablist">

                            <li role="presentation" class="active">
                                <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                                    <span class="round-tab">
                                        <i class='glyphicon glyphicon-globe nav-icons'></i>
                                    </span>
                                </a>
                            </li>
                            <li role="presentation" class="disabled">
                                <a href="#step2" data-toggle="tab" aria-controls="step2" role="tab" title="Step 2">
                                    <span class="round-tab">
                                        <i class='glyphicon glyphicon-bullhorn nav-icons'></i>
                                    </span>
                                </a>
                            </li>
                            <li role="presentation" class="disabled">
                                <a href="#step3" data-toggle="tab" aria-controls="step3" role="tab" title="Step 3">
                                    <span class="round-tab">
                                        <i class="fa fa-star" aria-hidden="true"></i>

                                    </span>
                                </a>
                            </li>
                            <li role="presentation" class="disabled">
                                <a href="#step4" data-toggle="tab" aria-controls="step4" role="tab" title="Step 4">
                                    <span class="round-tab">
                                        <i class="fa fa-bar-chart" aria-hidden="true"></i>

                                    </span>
                                </a>
                            </li>
                            <li role="presentation" class="disabled">
                                <a href="#step5" data-toggle="tab" aria-controls="step5" role="tab" title="Step 5">
                                    <span class="round-tab">
                                        <i class="glyphicon glyphicon-usd"></i>
                                    </span>
                                </a>
                            </li>
                            <li role="presentation" class="disabled">
                                <a href="#complete" data-toggle="tab" aria-controls="complete" role="tab" title="Complete">
                                    <span class="round-tab">
                                        <i class="fa fa-users" aria-hidden="true"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}


{/* <div className='container-fluid'>
<b><h4>Хуш келибсиз азиз хамқишлоқлар!</h4></b>
<div className='row'>
    <div style={{ paddingLeft: '0', paddingRight: '0' }} className='col-sm-8  col-xs-8'>
        <div class="panel panel-default">
            <div class="panel-body">
                <p style={{ fontSize: '12px' }} className='text-left'>Smart City ("Ақлли шаҳар") - Интернетдаги нарсалар билан алоқа ва ахборот технологияларининг ўзаро
                 боғланган тизими бўлиб, бунинг натижасида шаҳар ички жараёнлари соддалаштирилган ва аҳоли
                 турмуш даражаси яхшиланди.  Ақлли шаҳарнинг афзалликлари фуқароларнинг турмуш даражасини
                 ошириш, атроф муҳитни яхшилаш ва аналитик кўникмалардан фойдаланишни талаб қилмайдиган
                 фаолиятни автоматлаштириш орқали бизнес-жараёнлар харажатларини камайтиришдан иборат.
                 "Ақлли шаҳар" атамаси нисбатан яқинда жорий этилган. Мутахассислар ақлли шаҳар бошқарувининг
                 асосий манбаи аҳолининг маълумотлари эканлиги ҳақида келишиб олдилар.</p>  </div>
        </div>
    </div>
    <div style={{ paddingLeft: '0', paddingRight: '0', wordSpacing: '1px' }} className='col-sm-4 col-xs-4 text-left'>
        <div class="panel panel-default">
            <div style={{ paddingLeft: '2px', paddingRight: '2px' }} class="panel-body">
                <b><h6 style={{ fontSize: '10px' }}>Энг сунги янгиликлар.</h6></b>

                {news.map((ele) => {
                    return (
                        <div key={ele.news_id}>
                            <p style={{ color: '#0093d3', fontSize: '10px' }}>"{ele.title}"</p>
                            <p>{ele.text}</p>
                            <p>{ele.fullname}</p>
                            <p style={{ fontSize: '8px' }}>{Moment(ele.news_timestamp).format("LLLL")}</p>
                            <hr />
                        </div>
                    )
                })}  </div>
        </div>
        <h1>{surveyQuestion ? surveyQuestion.survey_question : ""}</h1>
        {surveyQuestion ? <StarRatings
            starRatedColor="yellow"
            rating={avg > 0 ? Number(avg) : 0}
            numberOfStars={5}
            starEmptyColor="grey"
        /> : ""}<br />
        <div>
            <h1>{announcements ? announcements.title : ""}</h1>
            <p>{announcements ? announcements.announcement : ""}</p>
            <p>{announcements ? announcements.fullname : ""}</p>
            <p>{announcements ? Moment(announcements.announ_timestamp).format("LLLL") : ""}</p>
            <hr />
        </div>
    </div>


</div>
</div> */}