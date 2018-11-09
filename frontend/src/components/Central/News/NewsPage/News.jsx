import React from "react";
import axios from 'axios';
import RenderNewsPageBox from "./RenderNewsPageBox";
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
const socketUrl = "http://192.168.43.95:3100";
// const socketUrl = "http://localhost:3100";

export default class News extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: "",
            news: [],
            getwrongcounts: [],
            getrightcounts: []
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/getallnews")
            .then( (res) => {
                this.setState({
                    news: res.data
                })
            })
            .then( () => {
                axios
                    .get("/users/getrightcounts")
                    .then((res) => {
                        this.setState({
                            getrightcounts: res.data
                        })
                        axios
                            .get("/users/getwrongcounts")
                            .then((res) => {
                                this.setState({
                                    getwrongcounts: res.data
                                })
                                axios
                                    .get("/users/getUsersId")
                                    .then( (res) => {
                                        this.setState({
                                            userId: res.data
                                        })
                                    })
                                    .catch( (err) => {
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
            .catch( (err) => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0? this.props.userInfo[0].username:""
        socket.emit(LOGOUT, username);
	}

    handleSubmitRightNews = (e) => {
        e.preventDefault();
        axios
            .post("/users/rightnews", {
                news_id: e.target.id
            })
            .then( () => {
                axios
                    .get("/users/getallnews")
                    .then((res) => {
                        this.setState({
                            news: res.data
                        })
                    })
                    .then( () => {
                        axios
                            .get("/users/getrightcounts")
                            .then((res) => {
                                this.setState({
                                    getrightcounts: res.data
                                })
                                axios
                                .get("/users/getwrongcounts")
                                .then( (res) => {
                                    this.setState({
                                        getwrongcounts: res.data
                                    })
                                })
                                .catch( (err) => {
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
            .catch( (err) => {
                console.log(err);
            })

    }

    handleSubmitWrongNews = (e) => {
        e.preventDefault();
        axios
            .post("/users/wrongnews", {
                news_id: e.target.id
            })
            .then( (res) => {
                axios
                .get("/users/getallnews")
                .then((res) => {
                    this.setState({
                        news: res.data
                    })
                })
                .then( () => {
                    axios
                        .get("/users/getrightcounts")
                        .then((res) => {
                            this.setState({
                                getrightcounts: res.data
                            })
                            axios
                                .get("/users/getwrongcounts")
                                .then( (res) => {
                                    this.setState({
                                        getwrongcounts: res.data
                                    })
                                })
                                .catch( (err) => {
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
            .catch( (err) => {
                console.log(err);
            })
    }

    render() {
        const { news, userId, getrightcounts, getwrongcounts } = this.state;
        // let result = Object.values(([...arr1, ...arr2].reduce((acc, d) => (acc[d.news_id] = {...acc[d.news_id], ...d }, acc) ,{})))

        // let result = [...arr1, ...arr2].map(elem => {
        //     let {count=0, news_id: id} = elem;
        //     elem.count = count;
        //     elem.title = "title" +id
        //     return elem;
        //   });

        // for (item of arr1) {
        //     var arr2item = arr2.find(item2 => item2.news_id === item.news_id);
        //   item['count'] = arr2item ? arr2item.count : 0;
        // };

        news.forEach(i => i.wrongees = (getwrongcounts.find(j => j.news_id === i.news_id) || { wrongees: 0 }).wrongees);
        news.forEach(i => i.rightees = (getrightcounts.find(j => j.news_id === i.news_id) || { rightees: 0 }).rightees);
        return(
            <div>
                <h4><span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3'}}>Янгиликлар</strong></h4>
                <hr/>
                <RenderNewsPageBox
                    news={news}
                    userId={userId}
                    handleSubmitRightNews={this.handleSubmitRightNews}
                    handleSubmitWrongNews={this.handleSubmitWrongNews}
                />
            </div>
        )
    }
}
