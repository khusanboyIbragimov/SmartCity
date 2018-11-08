import React from "react";
import axios from 'axios';
import RenderRatingBox from "./RenderRatingBox";
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
const socketUrl = "http://localhost:3100";

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            ratingQuestion: [],
            ratingScore: 0,
            feedback: "",
            more_comments: 3,
            userId: ""
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/getallratings")
            .then((res) => {
                this.setState({
                    ratingQuestion: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
        axios
            .get("/users/getUsersId")
            .then((res) => {
                this.setState({
                    userId: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0? this.props.userInfo[0].username:""
        socket.emit(LOGOUT, username);
	}

    handleInputFeedback = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    selectRatingQuestion = (e) => {
        e.preventDefault()
        console.log(e.target.id, this.state.ratingScore, this.state.feedback)
        axios
            .post("/users/rating", {
                rating_question_id: e.target.id,
                rating_score: this.state.ratingScore,
                feedback: this.state.feedback
            })
            .then( () => {
                axios
                .get("/users/getallratings")
                .then((res) => {
                    this.setState({
                        ratingQuestion: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
                this.setState({
                    feedback: "",
                    ratingScore: 0,
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    changeRating = ( newRating ) => {
        this.setState({
          ratingScore: newRating
        })
        
    }

    moreComments = (e) => {
        this.setState({
            more_comments: this.state.more_comments + 5
        })
    }

    render() {
        const { ratingQuestion, ratingScore, userId } = this.state;
        return (
            <div>
               <h4><span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3'}}>Рейтинглар</strong></h4>
               <hr/>
                <RenderRatingBox
                    ratingQuestion={ratingQuestion}
                    changeRating={this.changeRating}
                    ratingScore={ratingScore}
                    selectRatingQuestion={this.selectRatingQuestion}
                    handleInputFeedback={this.handleInputFeedback}
                    moreComments={this.moreComments}
                    more_comments={this.state.more_comments}
                    userId={userId}
                />
            </div>
        )
    }
}

