import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
var ReactS3Uploader = require("react-s3-uploader");

class Register extends React.Component {

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
            showSubmitButtonWithoutPhoto: true
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
            return <Redirect to="/" />
        }
        return(
            <div>
                <form onSubmit={this.handleSubmit} >
                    <input 
                        type="text"
                        onChange={this.handleInput}
                        name="username"
                        placeholder="юзернэйм"
                        required
                    />{" "}<span style={{color: "red"}}>*</span><br/>
                     <input 
                        type="password"
                        onChange={this.handleInput}
                        name="password"
                        placeholder="парол"
                        required
                    />{" "}<span style={{color: "red"}}>*</span><br/>
                    <input 
                        type="password"
                        onChange={this.handleInput}
                        name="confirm_password"
                        placeholder="қайтадан парол"
                        required
                    />{" "}<span style={{color: "red"}}>*</span><br/>
                    <input 
                        type="text"
                        onChange={this.handleInput}
                        name="fullname"
                        placeholder="тулиқ исмингиз"
                        required
                    />{" "}<span style={{color: "red"}}>*</span><br/>
                    <input 
                        type="text"
                        onChange={this.handleInput}
                        name="phone_number"
                        placeholder="телефон номерингиз"
                        required
                    />{" "}<span style={{color: "red"}}>*</span><br/>
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
                    /><br/>
                    {this.state.showWaitMessage? <h1>илтимос кутиб туринг...{" "} {completed}</h1>:""}
                    {this.state.showSubmitButton?<button>яратиш</button>:""}
                    {this.state.showSubmitButtonWithoutPhoto?<button>яратиш</button>:""}
                </form>
                <p>{password !== confirm_password && confirm_password? "пароллар хар хил": ""}</p>
            </div>
        )
    }
}

export default Register;