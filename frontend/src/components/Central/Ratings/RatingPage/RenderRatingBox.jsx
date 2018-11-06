import React from "react";
import RenderRating from "./RenderRating";

export default class RenderRatingBox extends React.Component {

    render() {
        const { ratingQuestion, ratingScore, selectRatingQuestion, handleInputFeedback } = this.props;
        return(
            <div>
                    {ratingQuestion.length> 0? ratingQuestion.map( (rate) => {
                        return( <RenderRating
                                    ratingQuestion={this.props.ratingQuestion}
                                    key={rate.rating_question_id}
                                    rating_question_id={rate.rating_question_id}
                                    rating_question={rate.rating_question}
                                    changeRating={this.props.changeRating}
                                    ratingScore={ratingScore}
                                    selectRatingQuestion={selectRatingQuestion}
                                    handleInputFeedback={handleInputFeedback}
                                    ratings={rate.avg}
                                    feedbacks={ rate.feedbacks !== null? rate.feedbacks.split("~*").slice(0,this.props.more_comments).map( (feedback, key) => { return( <span key={key}><span style={{color: '#e7711b'}} className='glyphicon glyphicon-comment'></span> {feedback}<br/></span> ) }):""}
                                    moreComments={this.props.moreComments}
                                    userId={this.props.userId}
                                    users_who_rated={rate.users_who_rated !== undefined && rate.users_who_rated !== null ?rate.users_who_rated.split(","):""}
                                />) 
                    }):""}
            </div>
        )
    }
}