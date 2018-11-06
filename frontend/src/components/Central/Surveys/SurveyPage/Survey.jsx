import React from "react";
import axios from 'axios';
import RenderSurveyBox1 from "./RenderSurveyBox1";
import io from 'socket.io-client';
import { LOGOUT } from '../../Giychat/Events';
const socketUrl = "http://localhost:3100";

export default class Survey extends React.Component {
    constructor() {
        super();
        this.state = {
            optionsAndPoints: [],
            userId: "",
            survey_counts: []
        }
    }

    componentDidMount() {
        this.logout();
        axios
            .get("/users/get_all_surveys")
            .then(res => {
                this.setState({
                    optionsAndPoints: res.data
                })
                axios
                    .get("/users/get_survey_counts")
                    .then((res) => {
                        this.setState({
                            survey_counts: res.data
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
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    logout = () => {
        const socket = io(socketUrl);
        let username = this.props.userInfo.length > 0 ? this.props.userInfo[0].username : ""
        socket.emit(LOGOUT, username);
    }

    handleVote = (e) => {
        axios
            .post("/users/post_survey_vote", {
                survey_question_id: e.target.id,
                survey_question_options_id: e.target.value,
            })
            .then((res) => {
                axios
                    .get("/users/get_all_surveys")
                    .then(res => {
                        this.setState({
                            optionsAndPoints: res.data
                        })
                        axios
                            .get("/users/get_survey_counts")
                            .then((res) => {
                                this.setState({
                                    survey_counts: res.data
                                })
                            })
                            .catch(err => {
                                console.log(err)
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
        const { optionsAndPoints, userId, survey_counts } = this.state;
        function group(array, key) {
            return [...array.reduce((acc, o) =>
                acc.set(o[key],
                    (acc.get(o[key]) || [])
                        .concat(o)), new Map())
                .values()];
        }
        var grouped = group(optionsAndPoints, 'survey_question_id');
        var countAdded = [];
        for (var i = 0; i < grouped.length; i++) {
            let eachGroup = grouped[i];
            eachGroup.forEach(i =>
                i.value = (survey_counts.find(j =>
                    j.survey_question_options_id === i.survey_question_options_id)
                    || { value: 0 }).value);
            countAdded.push(eachGroup);
        }
        // console.log('1========>: ', optionsAndPoints)
        // console.log('2========>: ', grouped)
        // console.log('3========>: ', countAdded)
        return (
            <div>
                <h3><span style={{ color: 'rgb(241, 159, 77)' }}>Smart</span> <strong style={{ color: '#0093d3'}}>Сўровлар</strong></h3>
                <RenderSurveyBox1
                    surveyAndOptions={countAdded}
                    handleVote={this.handleVote}
                    user_id={userId}
                />
            </div>
        )
    }
}

