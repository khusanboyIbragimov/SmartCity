import React from "react";
import RenderRating from "./RenderRating";

export default class RenderRatingBox extends React.Component {

    render() {
        const { surveyQuestion, rating, selectRatingQuestion, handleInputFeedback } = this.props;
        return(
            <div>
                <ul>
                    {surveyQuestion.length> 0? surveyQuestion.map( (survey) => {
                        return( <RenderRating
                                    surveyQuestion={this.props.surveyQuestion}
                                    key={survey.survey_question_id}
                                    survey_question_id={survey.survey_question_id}
                                    survey_question={survey.survey_question}
                                    changeRating={this.props.changeRating}
                                    rating={rating}
                                    selectRatingQuestion={selectRatingQuestion}
                                    handleInputFeedback={handleInputFeedback}
                                    ratings={survey.avg}
                                    feedbacks={ survey.feedbacks !== null? survey.feedbacks.split("~*").slice(0,this.props.more_comments).map( (feedback, key) => { return( <span key={key}>{feedback}<br/></span> ) }):""}
                                    moreComments={this.props.moreComments}
                                    userId={this.props.userId}
                                    users_who_rated={survey.users_who_rated !== undefined && survey.users_who_rated !== null ?survey.users_who_rated.split(","):""}
                                />) 
                    }):""}
                </ul>
            </div>
        )
    }
}