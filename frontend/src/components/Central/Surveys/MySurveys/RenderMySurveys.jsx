import React from 'react';

export default class RenderMySurveys extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            toggleEditMySurvey: false
        }
    }

    handleClickEditMySurvey = (e) => {
        this.setState({
            toggleEditMySurvey: true
        })
    }

    handleClickEditMySurvey2 = (e) => {
        this.setState({
            toggleEditMySurvey: false
        })
    }

    render() {
        const { toggleEditMySurvey } = this.state;
        return(
            <div>
                <form onSubmit={this.props.handleSubmitEditMySurvey} id={this.props.survey_question_id}>
                    <div id={this.props.survey_question_id}>
                    {!toggleEditMySurvey?<p>{this.props.survey_question}</p>:<input name="newSurveyQuestion" placeholder="менинг фикрим" onChange={this.props.handleInput}></input>} 
                    {!toggleEditMySurvey? <button onClick={this.handleClickEditMySurvey} id={this.props.survey_question_id}>ўзгартираман</button> : <button onClick={this.handleClickEditMySurvey2}>saqlayman</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteMySurvey} id={this.props.survey_question_id}>
                    <button onClick={this.handleClickEditMySurvey2}>ўчираман</button>
                </form>
                <hr />
            </div>
        )
    }
}
