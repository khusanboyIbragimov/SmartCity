import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
var ReactS3Uploader = require("react-s3-uploader");

export default  class Register extends React.Component {

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
        }
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
            user_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp/" + img.filename,
            showWaitMessage: false,
            showSubmitButton: true
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user_imgurl, username, password, fullname, phone_number} = this.state;
        axios 
            .post("/users/register", {
                username: username,
                password: password,
                fullname: fullname,
                phone_number: phone_number,
                user_imgurl: user_imgurl
            })
            .then( (res) => {
                this.setState({
                    redirect: true
                })
            })
            .catch( (err) => {
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
        const { password, confirm_password, redirect, completed } = this.state;
        if (redirect) {
            return <Redirect to="/sc/login" />
        }
        return(
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
                                        {this.state.showWaitMessage ? <h1>илтимос кутиб туринг...{" "} {completed}</h1> : ""}
                                    </div>
                                    <p>{password !== confirm_password && confirm_password ? "пароллар хар хил" : ""}</p>
                                </div>
                                <div className="col-md-6 text-justify">
                                    <h3 className="dark-grey">Terms and Conditions</h3>
                                    <p>
                                        By clicking on "Register" you agree to The Company's' Terms and Conditions
                                    </p>
                                    <p>
                                        While rare, prices are subject to change based on exchange rate fluctuations -
                                        should such a fluctuation happen, we may request an additional payment. You have the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
				                    </p>
                                    <p>
                                        Should there be an error in the description or pricing of a product, we will provide you with a full refund (Paragraph 13.5.6)
				                    </p>
                                    <p>
                                        Acceptance of an order by us is dependent on our suppliers ability to provide the product. (Paragraph 13.5.6)
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