import React from 'react';
import RenderSurveyBox2 from "./RenderSurveyBox2";

export default class RenderSurveyBox1 extends React.Component {

    render() {
        return (
            <div>
                {
                    this.props.surveyAndOptions !== undefined ?
                        this.props.surveyAndOptions.map((ele, i) => (
                            <div key={Math.random()} className='container'>
                                <div className="panel panel-default">
                                <div className="panel-heading">
                                <h4 style={{ color: '#0093d3' }} 
                                           className='text-left'>
                                            <i style={{color: 'rgb(241, 159, 77)'}}
                                               className="fa fa-bar-chart" 
                                               aria-hidden="true"
                                                >
                                            </i>
                                            &nbsp;{ele[i].survey_question}
                                        </h4>
                                </div>
                                    <div className="panel-body">
                                        <RenderSurveyBox2
                                            arr={ele}
                                            handleVote={this.props.handleVote}
                                            user_id={this.props.user_id}
                                        />
                                        <p style={{ fontSize: '12px', color: '#999' }} 
                                           className='text-right'>
                                           <i className="fa fa-pencil" aria-hidden="true"></i>
                                           &nbsp;{ele[i].fullname}
                                        </p>  
                                    </div>
                                </div>
                            </div>
                        )) : ""
                }
            </div>
        )
    }
}