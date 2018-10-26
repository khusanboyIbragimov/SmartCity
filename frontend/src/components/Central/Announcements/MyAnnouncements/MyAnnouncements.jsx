import React from "react";
import axios from "axios";
import RenderAnnouncementsBox from "./RenderAnnouncementsBox";

export default class MyAnnouncements extends React.Component {
    constructor() {
        super();
        this.state = {
            announcements: [],
            title: "",
            announcement: "",
            newTitle: "",
            newAnnouncement: ""
        }
    }

    componentDidMount() {
        axios
            .get("/users/getUsersAnnouncement")
            .then((res) => {
                this.setState({
                    announcements: res.data
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

    handleSubmitEditAnnouncement = (e) => {
        e.preventDefault();
        const { newTitle, newAnnouncement } = this.state;
        axios
            .patch(`/users/editannouncement`, {
                announcement_id: e.target.id,
                title: newTitle,
                announcement: newAnnouncement,
            })
            .then( () => {
                axios
                .get("/users/getUsersAnnouncement")
                .then( (res) => {
                    this.setState({
                        announcements: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    handleSubmitDeleteAnnouncement = (e) => {
        e.preventDefault();
        axios
            .patch("/users/deleteannouncement", {
                announcement_id: e.target.id
            })
            .then( (res) => {
                axios
                .get("/users/getUsersAnnouncement")
                .then( (res) => {
                    this.setState({
                        announcements: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const { title, announcement } = this.state;
        axios
            .post("/users/announcement", {
                title: title,
                announcement: announcement
            })
            .then( (res) => {
                this.setState({
                    title: "",
                    announcement: ""
                })
            })
            .then( (res) => {
                axios
                .get("/users/getUsersAnnouncement")
                .then( (res) => {
                    this.setState({
                        announcements: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })  
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    render() {
        const { announcement, title, announcements } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        onChange={this.handleInput}
                        name="title"
                        placeholder="сарлавха"
                        value={title}
                    />
                    <br/>
                    <textarea
                        type="text"
                        onChange={this.handleInput}
                        name="announcement"
                        placeholder="эълон матни"
                        value={announcement}
                    >
                    </textarea>
                    <br/>
                    <button>Эълон қиламан</button>
                </form>
                <hr/>
                Менинг эълонларим
                <RenderAnnouncementsBox
                    announcements={announcements}
                    handleInput={this.handleInput}
                    handleSubmitEditAnnouncement={this.handleSubmitEditAnnouncement}
                    handleSubmitDeleteAnnouncement={this.handleSubmitDeleteAnnouncement}
                />
            </div>
        )
    }
}