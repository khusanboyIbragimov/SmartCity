import React from 'react';
import RenderMyRatings from "./RenderMyRatings";

export default class RenderMyRatingsBox extends React.Component {

    render() {
        return(
            <div>
                    {this.props.my_ratings.length !== 0? this.props.my_ratings.map(elem => {
                        return<RenderMyRatings 
                                key={elem.rating_question_id}
                                rating_question_id={elem.rating_question_id}
                                rating_question={elem.rating_question}
                                handleSubmitEditMyRating={this.props.handleSubmitEditMyRating}
                                handleSubmitDeleteMyRating={this.props.handleSubmitDeleteMyRating}
                                handleInput={this.props.handleInput}
                            />
                    }):""}
            </div>
        )
    }
}