import React from 'react';

export default class RenderMySurveys extends React.Component {

    render() {
        return (
            <div className='col-sm-12 col-xs-12 '>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <h4 style={{ color: '#0093d3', marginLeft: "0px", marginRight: "0px" }}>{this.props.survey_question}</h4>
                            {this.props.option}<br />
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
