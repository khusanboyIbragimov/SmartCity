import React from 'react';
import RenderMySurveys from "./RenderMySurveys";

export default class RenderMySurveysBox extends React.Component {

    render() {
        return(
            <div>
                <ul>
                    {this.props.my_surveys.length !== 0? this.props.my_surveys.map(elem => {
                        return<RenderMySurveys 
                                key={elem.survey_question_id}
                                survey_question_id={elem.survey_question_id}
                                survey_question={elem.survey_question}
                                handleSubmitEditMySurvey={this.props.handleSubmitEditMySurvey}
                                handleSubmitDeleteMySurvey={this.props.handleSubmitDeleteMySurvey}
                                handleInput={this.props.handleInput}
                            />
                    }):""}
                </ul> 
            </div>
        )
    }
}