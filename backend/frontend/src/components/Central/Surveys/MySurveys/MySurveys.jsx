import React from "react";
import axios from 'axios';
import RenderMySurveysBox from "./RenderMySurveysBox";

export default class Survey extends React.Component {
    constructor() {
        super();
        this.state = {
            surveyQuestion: "",
            options: [{ name: "" }],
            surveysAndOptions: []
        }
    }

    componentDidMount() {
        axios
            .get("/users/get_user_surveys")
            .then(res => {
                this.setState({
                    surveysAndOptions: res.data
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
        const { surveyQuestion, options } = this.state;
        var surveyQuestionId = "";
        axios
            .post("/users/survey_question", {
                survey_question: surveyQuestion
            })
            .then((res) => {
                surveyQuestionId = res.data.survey_question_id;
                axios
                    .post("/users/survey_options", {
                        survey_question_id: surveyQuestionId,
                        options: options
                    })
                    .then((res) => {
                        axios
                            .get("/users/get_user_surveys")
                            .then(res => {
                                this.setState({
                                    surveysAndOptions: res.data
                                })
                            })
                            .catch(err => {
                                console.log(err);
                            })
                            this.setState({ 
                                options: [{name: ""}],
                                surveyQuestion: ""
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

    handleSubmitDeleteMySurvey = (e) => {
        e.preventDefault();
        axios
            .patch("/users/delete_my_survey", {
                survey_question_id: e.target.id
            })
            .then((res) => {
                axios
                    .get("/users/get_user_surveys")
                    .then(res => {
                        this.setState({
                            surveysAndOptions: res.data
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



    handleOptionInput = (idx) => (e) => {
        const newOptions = this.state.options.map((option, sidx) => {
            if (idx !== sidx) return option;
            return { ...option, name: e.target.value };
        })
        this.setState({ options: newOptions });
    }

    handleAddOption = () => {
        this.setState({
            options: [...this.state.options, { name: "" }]
        })
    }

    handleRemoveOption = idx => () => {
        const { options } = this.state;
        this.setState({
            options: options.filter((option, sidx) => idx !== sidx)
        })
    }

    render() {
        const { options, surveysAndOptions, surveyQuestion } = this.state;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmitSurveyQuestion}>
                            <div className="row">
                                <div className="col-sm-1"></div>
                                <div className="col-sm-12">
                                    <input
                                        style={{borderColor: '#0093d3'}}
                                        type="text"
                                        name="surveyQuestion"
                                        onChange={this.handleInputSurveyQuestion}
                                        className="form-control"
                                        value={surveyQuestion}
                                        placeholder="Сўров матни"
                                    />
                                </div>
                                <div className="col-sm-1"></div>
                            </div> <br />
                            {options.map((option, idx) => (
                                <div key={idx}>
                                    <div className="row">
                                        <div className="col-sm-8 col-xs-12">
                                            <input
                                                type="text"
                                                name="options"
                                                className="form-control"
                                                style={{borderColor: '#0093d3'}}
                                                value={option.name}
                                                onChange={this.handleOptionInput(idx)}
                                                placeholder={`Вариант ${idx + 1}`}
                                            />
                                        </div>
                                        <div className="col-sm-2 col-xs-6">
                                            <button
                                                className="form-control btn btn-primary"
                                                type="button"
                                                onClick={this.handleAddOption}
                                                >Вариант&nbsp;
                                                <i className="fa fa-plus" aria-hidden="true"></i>
                                                </button>
                                        </div>
                                        <div className="col-sm-2 col-xs-6">
                                            <button
                                                className="form-control btn btn-danger"
                                                type="button"
                                                onClick={idx < 1 ? this.nothing : this.handleRemoveOption(idx)}
                                            >Вариант&nbsp;
                                            <i className="fa fa-minus" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))} <br />
                            <button className="form-control btn btn-success">
                                Сўров тарқатиш
                            </button>
                        </form>
                    </div>
                </div>
                <br />
                <h3>Менинг сўровларим</h3>
                <RenderMySurveysBox
                    surveysAndOptions={surveysAndOptions}
                    handleSubmitDeleteMySurvey={this.handleSubmitDeleteMySurvey}
                />
            </div>
        )
    }
}