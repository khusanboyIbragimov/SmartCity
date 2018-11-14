import React from 'react';
import RenderSurvey from "./RenderSurvey";

export default class RenderSurveyBox2 extends React.Component {
    render() {
        return(
          <div className='container'>
            <div className="panel panel-default gold_border">
              <div>
                <div className="panel-heading">
                  <h4 style={{ color: '#0093d3' }}
                       className='text-left'>
                        <i style={{color: 'rgb(241, 159, 77)'}}
                           className="fa fa-bar-chart"
                           aria-hidden="true"
                            >
                        </i>
                        &nbsp;{this.props.arr[0]? this.props.arr[0].survey_question:""}
                    </h4>
            </div>
                {
                    this.props.arr.length !== 0? this.props.arr.map( (ele) => (
                      <div className="panel-body" key={Math.random()}>
                        <RenderSurvey

                            handleVote={this.props.handleVote}
                            text={ele.text}
                            survey_question_id={ele.survey_question_id}
                            survey_question_options_id={ele.survey_question_options_id}
                            value={ele.value}
                            user_id={this.props.user_id}
                            users={ele.users !== null ? ele.users.split(","):""}
                        />
                        </div>
                    )):""
                }
                  <p style={{ fontSize: '12px'}}
                     className='text-right blue_font'>
                     <i className="fa fa-pencil" aria-hidden="true"></i>
                     &nbsp;{this.props.arr[0]? this.props.arr[0].fullname:""}
                     &nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                </div>
              </div>
            </div>
        )
    }
}
