import React from 'react';
import RenderSurvey from "./RenderSurvey";

export default class RenderSurveyBox2 extends React.Component {
    render() {
        return(
            <div>
                {
                    this.props.arr.length !== 0? this.props.arr.map( (ele) => (
                        <RenderSurvey
                            key={Math.random()}
                            handleVote={this.props.handleVote}
                            text={ele.text}
                            survey_question_id={ele.survey_question_id}
                            survey_question_options_id={ele.survey_question_options_id}
                            value={ele.value}
                            user_id={this.props.user_id}
                            users={ele.users !== null ? ele.users.split(","):""}
                        />
                    )):""
                }
            </div>
        )
    }
}