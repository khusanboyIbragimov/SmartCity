import React from 'react';
import RenderMySurveys from "./RenderMySurveys";

export default class RenderMySurveysBox extends React.Component {

    render() {
        return (
                <div className="row">
                    {this.props.surveysAndOptions.length !== 0 ? this.props.surveysAndOptions.map(elem => (
                        <div key={Math.random()} className="col-sm-6 col-xs-12">
                                <RenderMySurveys
                                    key={Math.random()}
                                    survey_question_id={elem.survey_question_id}
                                    survey_question={elem.survey_question}
                                    option={elem.options !== null ? elem.options.split(",").map((o) => (<li>{o}</li>)): ""}
                                    handleSubmitDeleteMySurvey={this.props.handleSubmitDeleteMySurvey}
                                />
                        </div>
                    )) : ""}
                </div>
        )
    }
}
