import React from 'react';

export default class RenderMyRatings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleEditMyRating: false
        }
    }

    handleClickEditMyRating = (e) => {
        this.setState({
            toggleEditMyRating: true
        })
    }

    handleClickEditMyRating2 = (e) => {
        this.setState({
            toggleEditMyRating: false
        })
    }

    render() {
        const { toggleEditMyRating } = this.state;
        return (
               <div className='row'>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-12 text-left' id={this.props.rating_question_id}>
                                {!toggleEditMyRating ?
                                    <h4 style={{ color: "#0093d3" }}><span style={{color: 'rgb(241, 159, 77)'}} className='glyphicon glyphicon-star'></span> 
                                    &nbsp;{this.props.rating_question}</h4> :
                                    <input name="newRatingQuestion"
                                        className='form-control'
                                        placeholder="менинг фикрим"
                                        onChange={this.props.handleInput}>
                                    </input>}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 '>
                                <div className='row'>
                                    <div className='col-sm-6 col-xs-6'>
                                        <form
                                            onSubmit={this.props.handleSubmitEditMyRating}
                                            id={this.props.rating_question_id}>
                                            {!toggleEditMyRating ?
                                                <button
                                                    style={{ width: '100%' }}
                                                    className='btn btn-success'
                                                    onClick={this.handleClickEditMyRating}
                                                    id={this.props.rating_question_id}>
                                                    <span className='glyphicon glyphicon-edit'></span> ўзгартириш
                                                </button> :
                                                <button
                                                    style={{ width: '100%' }}
                                                    className='btn btn-success'
                                                    onClick={this.handleClickEditMyRating2}>
                                                    <span className='glyphicon glyphicon-floppy-saved'></span> сақлаш
                                                </button>}
                                        </form>
                                    </div>
                                    <div className='col-sm-6 col-xs-6'>
                                        <form
                                            onSubmit={this.props.handleSubmitDeleteMyRating}
                                            id={this.props.rating_question_id}>
                                            <button
                                                style={{ width: '100%' }}
                                                className='btn btn-danger'
                                                onClick={this.handleClickEditAnnouncements2}>
                                                <span className='glyphicon glyphicon-trash'></span> ўчириш
                                                </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
