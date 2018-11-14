import React from 'react';
import RenderSurveyBox2 from "./RenderSurveyBox2";

export default class RenderSurveyBox1 extends React.Component {

    render() {
        return (
            <div>
                {
                  this.props.surveyAndOptions !== undefined ?
                      this.props.surveyAndOptions.map((ele, i) => (
                        <div key={Math.random()}>
                          <RenderSurveyBox2
                              arr={ele}
                              handleVote={this.props.handleVote}
                              user_id={this.props.user_id}
                          />
                        </div>
                      )) : ""
                }
            </div>
        )
    }
}
