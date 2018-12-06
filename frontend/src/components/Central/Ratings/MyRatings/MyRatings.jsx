import React from "react";
import axios from 'axios';
import RenderMyRatingsBox from "./RenderMyRatingsBox";

export default class MyRatings extends React.Component {
    constructor() {
        super();
        this.state = {
            ratingQuestion: "",
            my_ratings: [],
            newRatingQuestion: ""
        }
    }

    componentDidMount() {
        axios
            .get("/users/getMyRatings")
            .then((res) => {
                this.setState({
                    my_ratings: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInputRatingQuestion = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitRatingQuestion = (e) => {
        e.preventDefault();
        const { ratingQuestion } = this.state;
        axios
            .post("/users/ratingquestion", {
                rating_question: ratingQuestion
            })
            .then(() => {
                axios
                    .get("/users/getMyRatings")
                    .then((res) => {
                        this.setState({
                            my_ratings: res.data,
                            ratingQuestion: ""
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleSubmitDeleteMyRating = (e) => {
        e.preventDefault();
        let ratingQuestionId = e.target.id;
        axios
            .patch("/users/delete_feedback_4my_rating", {
                rating_question_id: e.target.id
            })
            .then((res) => {
                axios
                    .patch("/users/delete_my_rating", {
                        rating_question_id: ratingQuestionId
                    })
                    .then(() => {
                        axios
                            .get("/users/getMyRatings")
                            .then((res) => {
                                this.setState({
                                    my_ratings: res.data
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { my_ratings } = this.state;
        return (
            <div>
                <div className='row'>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmitRatingQuestion}>
                            <input style={{ borderColor: '#0093d3' }}
                                type="text"
                                name="ratingQuestion"
                                onChange={this.handleInputRatingQuestion}
                                value={this.state.ratingQuestion}
                                className="form-control"
                                placeholder="rating question"
                            ></input><br />
                            <button className='btn btn-success form-control'>
                                submit
                            </button>
                        </form>
                    </div>
                </div>
                </div>
                <h3>My ratings</h3>
                <RenderMyRatingsBox
                    my_ratings={my_ratings}
                    handleInput={this.handleInputRatingQuestion}
                    handleSubmitDeleteMyRating={this.handleSubmitDeleteMyRating}
                />
            </div>

        )
    }
}
