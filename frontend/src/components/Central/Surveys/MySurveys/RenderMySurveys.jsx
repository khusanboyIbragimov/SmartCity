import React from 'react';

export default class RenderMySurveys extends React.Component {

    render() {
        return (
            <div className='col-sm-12 col-xs-12 '>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <h4 style={{ color: '#0093d3', marginLeft: "0px", marginRight: "0px" }}><i style={{ color: 'rgb(241, 159, 77)' }}
                                className="fa fa-bar-chart"
                                aria-hidden="true"
                            >
                            </i>
                                &nbsp;{this.props.survey_question}</h4>
                           <p>{this.props.option}</p> <hr />
                            <form
                                onSubmit={this.props.handleSubmitDeleteMySurvey}
                                id={this.props.survey_question_id}>
                                <button
                                    style={{ width: '100%' }}
                                    className='btn btn-danger'
                                >
                                    <span className='glyphicon glyphicon-trash'></span> ўчириш
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
