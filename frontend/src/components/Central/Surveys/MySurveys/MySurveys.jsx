import React from "react";
import axios from 'axios';
import RenderMySurveysBox from "./RenderMySurveysBox";

export default class Survey extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyQuestion: "",
            my_surveys: [],
            newSurveyQuestion: ""
        }
    }

    componentDidMount() {
        axios
            .get("/users/getMySurveys")
            .then((res) => {
                this.setState({
                    my_surveys: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleInputSurveyQuestion = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitSurveyQuestion = (e) => {
        e.preventDefault();
        const { surveyQuestion } = this.state;
        axios
            .post("/users/surveyquestion", {
                survey_question: surveyQuestion
            })
            .then( () => {
                axios
                    .get("/users/getMySurveys")
                    .then( (res) => {
                        this.setState({
                            my_surveys: res.data
                        })
                    })
                    .catch( err => {
                        console.log(err);
                    })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    handleSubmitEditMySurvey = (e) => {
        e.preventDefault();
        const { newSurveyQuestion } = this.state;
        axios
            .patch(`/users/edit_my_survey`, {
                survey_question_id: e.target.id,
                survey_question: newSurveyQuestion,
            })
            .then( () => {
                axios
                .get("/users/getMySurveys")
                .then( (res) => {
                    this.setState({
                        my_surveys: res.data
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

    handleSubmitDeleteMySurvey = (e) => {
        e.preventDefault();
        let surveyQuestionId = e.target.id
        axios
            .patch("/users/delete_feedback_4my_survey", {
                survey_question_id: e.target.id
            })
            .then( (res) => {
               axios
                .patch("/users/delete_my_survey", {
                    survey_question_id: surveyQuestionId
                })
                .then( () => {
                    axios
                        .get("/users/getMySurveys")
                        .then((res) => {
                            this.setState({
                                my_surveys: res.data
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch( err => {
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    render() {
        const { my_surveys } = this.state;
        return(
            <div>
                Сўровлар
                <form onSubmit={this.handleSubmitSurveyQuestion}>
                    <input 
                        type="text" 
                        name="surveyQuestion" 
                        onInput={this.handleInputSurveyQuestion}
                    ></input>
                    <button>сўрайман</button>
                </form>
                <hr/>
                <RenderMySurveysBox
                    my_surveys={my_surveys}
                    handleInput={this.handleInputSurveyQuestion}
                    handleSubmitEditMySurvey={this.handleSubmitEditMySurvey}
                    handleSubmitDeleteMySurvey={this.handleSubmitDeleteMySurvey}
                />
            </div>
        )
    }
}