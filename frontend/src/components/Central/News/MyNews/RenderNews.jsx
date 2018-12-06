import React from 'react';
var Moment = require("moment");
// require('moment/locale/uz');

export default class RenderNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleEditNews: false
        }
    }

    handleClickEditNews = (e) => {
        this.setState({
            toggleEditNews: true
        })
    }

    handleClickEditNews2 = (e) => {
        this.setState({
            toggleEditNews: false
        })
    }

    render() {
        const { toggleEditNews } = this.state;
        return (
            <div >
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-12 text-left' id={this.props.news_id}>
                                {!toggleEditNews ?
                                    <h4 style={{ color: '#0093d3' }}><span style={{color: 'rgb(241, 159, 77)'}} className='glyphicon glyphicon-globe'></span>&nbsp;{this.props.title}</h4> :
                                    <input
                                        className="form-control"
                                        name="newTitle"
                                        placeholder="title"
                                        type="text"
                                        onChange={this.props.handleInput}>
                                    </input>
                                }
                            </div>
                            <div className='col-sm-12 text-justify'>
                                {!toggleEditNews ?
                                    <p>{this.props.text}</p> :
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        id="comment"
                                        name="newText"
                                        placeholder="text"
                                        type="text"
                                        onChange={this.props.handleInput}>
                                    </textarea>
                                }
                            </div>
                            <div className='col-sm-12'>
                            <hr></hr>
                                <p style={{ color: "grey", fontSize: "12px", textAlign: "right" }}>
                                    {Moment(this.props.news_timestamp).format("LLLL")}
                                </p>
                            </div>
                                <div className='row'>
                                    <div className='col-sm-12 col-xs-12'>
                                        <form onSubmit={this.props.handleSubmitDeleteNews} id={this.props.news_id}>
                                            <button
                                                style={{ width: '100%' }}
                                                className='btn btn-danger'
                                                onClick={this.handleClickEditNews2}>
                                                <span className='glyphicon glyphicon-trash'></span> delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
