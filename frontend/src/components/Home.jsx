import React from "react";
import axios from 'axios';
import io from 'socket.io-client';
import { LOGOUT } from '../components/Central/Giychat/Events';
import { Link } from "react-router-dom";
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
                <b><h4><img alt="" style={{ height: '22px' }} src={photo} />га Хуш келибсиз азиз <span style={{ color: "#0093d3" }}>хамқишлоқлар!</span></h4></b>
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
                    &nbsp;Ушбу вебсайт ҳақида.</h5></b>
                <p style={{ color: '#45594a', fontSize: '12px' }}><i className="fa fa-book" aria-hidden="true"></i>
                    &nbsp;Ўқиб чиқинг илтимос.</p>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12  col-xs-12'>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>Smart City ("Ақлли шаҳар") - Интернетдаги нарсалар билан алоқа ва ахборот технологияларининг ўзаро
                             боғланган тизими бўлиб, бунинг натижасида шаҳар (қишлоқ) ички жараёнлари соддалаштирилган ва аҳоли
                                 турмуш даражаси яхшиланган.</p><p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>Ақлли шаҳарнинг афзалликлари фуқароларнинг турмуш даражасини
                            ошириш, атроф муҳитни яхшилаш ва аналитик кўникмалардан фойдаланишни талаб қилмайдиган
                            фаолиятни автоматлаштириш орқали бизнес-жараёнлари харажатларини камайтиришдан иборат.
                                 </p><p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>"Ақлли шаҳар" атамаси нисбатан яқинда жорий этилган. Мутахассисларни айтишларича ақлли
                                 шаҳар бошқарувининг асосий манбаи аҳолининг маълумотлари ҳисобланади.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>Ушбу тизимда биз сизни ақлли шаҳар лойиҳаси билан таништирдик. Ушбу жараёнга сиз ҳам қушилинг. Смарт шаҳар саҳифасига қушилсангиз  сиз замонавий смарт янгиликлардан ҳабардор булибгина қолмай, узингиз ҳам янгилик қолдиришингиз мумкин. Смарт янгилик деганда шуни тушуниш керак аҳолининг овоз бериши ёрдамида  қанчалик ҳақиқат эканлигини билиб олишга қодир буласиз. Смарт рейтингларимизда истаган савдо нуқтасини, корҳонани ёки ишчиларини баҳо қолдириб ва неча юлдузчага эга эканлигидан маълумот олишингиз мумкин. Қишлогимизга оид турли смарт суровларга овоз қолдиришингиз ва узингиз ҳам суров қолдиришингиз мумкин.
                           Ушбу смарт сити саҳифасида турли эълонлар қолдиришингиз ва турли эълонлар билан танишишингиз мумкин.
                                Смарт бозор лойиҳасида бевосита узингизнинг буюмнигизни савдога қуйиш, ижарага бериш ва уз ҳизматингизни таклиф қилишингиз мумкин. </p>
                            <b><h5><i style={{ color: 'rgb(241, 159, 77)' }} className="fa fa-info-circle" aria-hidden="true"></i>
                                &nbsp;Вебсайтдан фойдаланиш ҳақида маълумот.</h5></b>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>Салом азиз ҳамқишлоқлар азиз Ғулакандозликлар! Ушбу бўлимда сизга вебсайтдан қандай тулиқ
                    қулай фойдаланиш ҳақида маълумот берамиз.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>1. Вебсайтни ҳамма имкониятларидан тулиқ фойдаланиш учун <Link to='/sc/register'>аккаунт яратишни</Link> тафсия этамиз.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2. Аккаунт яратганингиздан сунг уз профайлингизга<span style={{ textIndent: '2px' }} className="glyphicon glyphicon-user nav-icons"></span>&nbsp; борсангиз 5 та навигация кнопкалари бор: <button className='btn btn-default btn-xs'>янгиликларим</button>, <button className='btn btn-default btn-xs'>эълонларим</button>, <button className='btn btn-default btn-xs'>рейтингларим</button>, <button className='btn btn-default btn-xs'>суровларим</button>, <button className='btn btn-default btn-xs'>бозорим</button>.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.1.  <button className='btn btn-default btn-xs'><i className='glyphicon glyphicon-globe'></i> янгиликларим</button> кнопкасида сиз уз янгиликларингизни сарлафҳаси, матни ва расмини юклаб оммага тарқатишингиз мумкин. (исталган вақтда уз янгилигингизни учиришингиз мумкин)</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.2. <button className='btn btn-default btn-xs'><i className='glyphicon glyphicon-bullhorn'></i> эълонларим</button> кнопкасида сиз турли эълонларни ёзиб қолдиришингиз мумкин. (эълон сарлавҳаси ва матни). (исталган вақтда уз эълонингизни учиришингиз мумкин).</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.3. <button className='btn btn-default btn-xs'><i className="fa fa-star" aria-hidden="true"></i> рейтингларим</button> кнопкасида Гулакандоз аҳлидан бирор савдо нуқтаси, овқатланиш ошҳонаси, чойҳона ёки ҳизмат курсатиш шаҳоблари, хизмат кўрсатиш соҳаси ишчилари (докторлар, автомобил устолари ва ҳоказолар) ни оммага таклиф килиб рейтинг даражаларини аниқлаш билан янада ҳизмат даражасини кутарилишига уз ҳиссангизни қушишингиз мумкин. </p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.4. <button className='btn btn-default btn-xs'><i className="fa fa-bar-chart" aria-hidden="true"></i> суровларим</button> кнопкасида сиз ҳар хил суровларга омма фикрини билишингиз мумкин.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.5. <button className='btn btn-default btn-xs'><i className="glyphicon glyphicon-usd"></i> бозорим</button>  кнопкасида бевосита узингизнинг буюмнигизни савдога қуйиш, ижарага бериш ва уз хизматингизни таклиф қилишингиз мумкин.</p>
                            <p style={{ fontSize: '12px', textIndent: '20px' }} className='text-left'>2.6. Биз сизга яна <button className='btn btn-default btn-xs'><i className="fa fa-users" aria-hidden="true"></i> ғийчат</button> лойиҳасини таклиф этамиз. У ерда сиз ҳордиқ вақтингизда кириб ҳамқишлоқларингиз билан фикр алмашишингиз мумкин.</p>
                        </div>
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