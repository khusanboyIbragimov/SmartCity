import React from "react";
import axios from "axios";
import RenderNewsBox from "./RenderNewsBox";
var ReactS3Uploader = require("react-s3-uploader");


export default class MyNews extends React.Component {
    constructor() {
        super();
        this.state = {
            news: [],
            title: "",
            text: "",
            newTitle: "",
            newText: "",
            showWaitMessage: false,
            showSubmitButtonWithPhoto: false,
            completed: "",
            news_imgurl: "",
            showSubmitButtonWithoutPhoto: true
        }
    }

    componentDidMount() {
        axios
            .get("/users/getUsersPosts")
            .then((res) => {
                this.setState({
                    news: res.data
                })
            })
            .catch((err) => {
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
            news_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp/" + img.filename,
            showWaitMessage: false,
            showSubmitButtonWithPhoto: true
        })
    }

    handleClick = () => {
        this.setState({
            showWaitMessage: true,
            showSubmitButtonWithoutPhoto: false
        })
    }


    handleSubmitEditNews = (e) => {
        e.preventDefault();
        const { newTitle, newText } = this.state;
        axios
            .patch(`/users/editnews`, {
                news_id: e.target.id,
                title: newTitle,
                text: newText,
            })
            .then(() => {
                axios
                    .get("/users/getUsersPosts")
                    .then((res) => {
                        this.setState({
                            news: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleSubmitDeleteNews = (e) => {
        e.preventDefault();
        var user_id = e.target.id;
        axios
            .patch("/users/delete_wrong_news", {
                news_id: user_id
            })
            .then(() => {
                axios
                    .patch("/users/delete_right_news", {
                        news_id: user_id
                    })
                    .then(() => {
                        axios
                            .patch("/users/deletenews", {
                                news_id: user_id
                            })
                            .then((res) => {
                                axios
                                    .get("/users/getUsersPosts")
                                    .then((res) => {
                                        this.setState({
                                            news: res.data
                                        })
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { title, text, news_imgurl } = this.state;
        axios
            .post("/users/news", {
                title: title,
                text: text,
                news_imgurl: news_imgurl
            })
            .then((res) => {
                this.setState({
                    title: "",
                    text: "",
                    news_imgurl: ""
                })
            })
            .then((res) => {
                axios
                    .get("/users/getUsersPosts")
                    .then((res) => {
                        this.setState({
                            news: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { news, title, text, completed } = this.state;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <input className="form-control"
                                type="text"
                                onChange={this.handleInput}
                                name="title"
                                placeholder="сарлавҳа"
                                value={title}
                                style={{ borderColor: '#0093d3' }}
                            />
                            <br />
                            <textarea className="form-control" rows="5" id="comment"
                                type="text"
                                onChange={this.handleInput}
                                name="text"
                                placeholder="янгилик матни"
                                value={text}
                                style={{ borderColor: '#0093d3' }}
                            >
                            </textarea>
                            <br />
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
                            {this.state.showSubmitButtonWithPhoto ? <button className='btn btn-success form-control'>Янгилик тарқатиш</button> : ""}
                            {this.state.showSubmitButtonWithoutPhoto ? <button className='btn btn-success form-control'>Янгилик тарқатиш</button> : ""}
                        </form>
                    </div>
                </div>
                <h3>Mенинг янгиликларим</h3>
                <RenderNewsBox
                    news={news}
                    handleInput={this.handleInput}
                    handleSubmitEditNews={this.handleSubmitEditNews}
                    handleSubmitDeleteNews={this.handleSubmitDeleteNews}
                />
            </div>
        )
    }
}