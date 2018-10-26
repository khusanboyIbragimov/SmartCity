import React from "react";
import axios from 'axios';
import RenderRatingBox from "./RenderRatingBox";
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
const socketUrl = "http://localhost:3100";

  
export default class Survey extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyQuestion: [],
            rating: 0,
            feedback: "",
            more_comments: 3,
            userId: ""
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/getallsurveys")
            .then((res) => {
                this.setState({
                    surveyQuestion: res.data
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
            [e.targe]: e.target.value
        })
    }

    selectRatingQuestion = (e) => {
        e.preventDefault()
        axios
            .post("/users/rating", {
                survey_question_id: e.target.id,
                rating_score: this.state.rating,
                feedback: this.state.feedback
            })
            .then( () => {
                axios
                .get("/users/getallsurveys")
                .then((res) => {
                    this.setState({
                        surveyQuestion: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
                this.setState({
                    feedback: "",
                    rating: 0,
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    changeRating = ( newRating ) => {
        this.setState({
          rating: newRating
        })
        
    }

    moreComments = (e) => {
        this.setState({
            more_comments: this.state.more_comments + 5
        })
    }

    render() {
        const { surveyQuestion, rating, userId } = this.state;
        return (
            <div>
                Сўров
                <RenderRatingBox
                    surveyQuestion={surveyQuestion}
                    changeRating={this.changeRating}
                    rating={rating}
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

