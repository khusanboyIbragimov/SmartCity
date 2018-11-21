import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
const photo = require('./logo2.png');

var ReactS3Uploader = require("react-s3-uploader");

export default class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            fullname: "",
            phone_number: "",
            redirect: false,
            user_imgurl: "",
            s3_imgurl: "",
            showWaitMessage: false,
            showSubmitButton: false,
            showSubmitButtonWithoutPhoto: true,
            nickname: "",
            redirect_user: false
        }
    }

    componentDidMount() {
        axios
            .get("/users/userInfo")
            .then(res => {
                this.setState({
                    nickname: res.data[0].username,
                    redirect_user: true
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUploadProgress = (percent) => {
        this.setState({
            completed: percent + "%"
        })

    }

    onUploadFinish = (img) => {
        this.setState({
            user_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp2/" + img.filename,
            showWaitMessage: false,
            showSubmitButton: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user_imgurl, username, password, fullname, phone_number } = this.state;
        axios
            .post("/users/register", {
                username: username,
                password: password,
                fullname: fullname,
                phone_number: phone_number,
                user_imgurl: user_imgurl
            })
            .then((res) => {
                this.setState({
                    redirect: true
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleClick = () => {
        this.setState({
            showWaitMessage: true,
            showSubmitButtonWithoutPhoto: false

        })
    }

    render() {
        const { password, confirm_password, redirect, completed, fullname, redirect_user } = this.state;

        if (redirect_user) {
            return <Redirect to="/" />
        }
        if (redirect) {
            return <Redirect to="/sc/login" />
        }
        return (
            <div>
                <div className="container-fluid">
                    <section className="container">
                        <div className="container-page">
                            <form onSubmit={this.handleSubmit} >
                                <div className="col-md-6">
                                    <h3 className="dark-grey">Aккаунт яратиш</h3>
                                    <div className="form-group col-lg-12">
                                        <label>Юзернэйм</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleInput}
                                            name="username"
                                            placeholder="юзернэйм"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Тўлиқ исмингиз</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleInput}
                                            name="fullname"
                                            placeholder="тулиқ исмингиз"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Телефон номер</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            onChange={this.handleInput}
                                            name="phone_number"
                                            placeholder="телефон номерингиз"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Пароль</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            onChange={this.handleInput}
                                            name="password"
                                            placeholder="парол"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Қайтадан пароль</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            onChange={this.handleInput}
                                            name="confirm_password"
                                            placeholder="қайтадан парол"
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label>Суратингизни юкланг</label>
                                        <ReactS3Uploader
                                            signingUrl="/s3/sign"
                                            signingUrlMethod="GET"
                                            accept="image/*"
                                            uploadRequestHeaders={{
                                                'x-amz-acl': 'public-read'
                                            }}
                                            onFinish={this.onUploadFinish}
                                            onProgress={this.onUploadProgress}
                                            onClick={this.handleClick}
                                        /><br />
                                        {this.state.showWaitMessage ? <h5 style={{ color: 'red' }}>илтимос кутиб туринг...{" "} {completed}</h5> : ""}
                                    </div>
                                    <p>{password !== confirm_password && confirm_password ? "пароллар хар хил" : ""}</p>
                                </div>
                                <div className="col-md-6 text-justify">
                                    <h4 className="dark-grey">Ушбу вебсайтдан фойдаланиш шартлари ва қонунлари.</h4>
                                    <p>
                                        "Яратиш" кнопкасини босиш орқали Сиз <img alt="" style={{ height: '12px' }} src={photo} /> маъмурияти шартлари ва қонунларига розилик билдирасиз.
                                    </p>
                                    <p>
                                        Ушбу бандда таъқиқланган ҳар қандай ноқонуний мақсад учун веб-сайт ёки хизматлардан фойдаланмаслигингизга розилик билдирасиз.
				                    </p>
                                    <p>
                                        Сиз ушбу Веб-сайт бизнесига зарар етказадиган ҳар қандай усулда фойдаланмаслигингизга розилик билдирасиз.				                    </p>
                                    <p>
                                        а) Бундан ташқари, сиз Веб-сайтда қуйидаги ишлар билан шугилланмасликка розилик берасиз:
				                    </p>
                                    <p>
                                        а.1) бошқаларни таҳқирлаш, таҳдид қилиш ёки бошқа шахсларнинг қонуний ҳуқуқларини бузиш;
				                    </p>
                                    <p>
                                        а.2) Компаниянинг ёки учинчи томоннинг интеллектуал мулк ҳуқуқларини бузиш;
				                    </p>
                                    <p>
                                        а.3) ҳар қандай компютер вирусини ёки бошқаларни мулкига шикаст етказиши мумкин бўлган дастурларни юклаш ёки тарқатиш;
				                    </p>
                                    <p>
                                        а.4) ҳар қандай фирибгарлик қилиш;
				                    </p>
                                    <p>
                                        а.5) ҳар қандай ноқонуний қимор, лотереялар ёки пирамида схемасини тузиш ёки яратиш;
				                    </p>
                                    <p>
                                        а.6) Ҳар қандай гуруҳга нисбатан зўравонлик, нафрат ёки камситишларни келтириб чиқарадиган ҳар қандай материални нашр қилиш ёки тарқатиш;				                    </p>
                                    <p>
                                        а.7) Бошқалар ҳақида ноқонуний маълумот тўплаш.  				                    </p>
                                    <p>
                                        а.8) Ҳар қандай экстриместик группаларни ғояларини илгари суриш ёки шунга оид материалларни юклаш қатиян манъ этилади;
				                    </p>
                                    <p>
                                        а.9) Ҳар ҳил давлатга қарши булган исён уйготувчи материалларни тарқатиш манъ этилади;
				                    </p>
                                    <p>
                                        b) Қуидаги қонунларни бирорта бандига буйсинмаган шаҳсларни профили ва тарқатган барча материаллари шаҳсни розилигисиз учирилади.
                                   </p>
                                    <p>
                                        c) Мен <b><span style={{ color: '#0093d3' }}>{fullname}</span></b> ушбу ердаги келтирилган қонун қоидаларни ҳаммасига риоя киламан! Аккаунтимни яратишларингни сурайман!
                                   </p>
                                    {this.state.showSubmitButton ? <button className="btn btn-primary">яратиш</button> : ""}
                                    {this.state.showSubmitButtonWithoutPhoto ? <button className="btn btn-primary">яратиш</button> : ""}
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
