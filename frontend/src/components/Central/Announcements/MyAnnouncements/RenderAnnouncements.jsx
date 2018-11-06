import React from 'react';
var Moment = require("moment");
require('moment/locale/uz');

export default class RenderAnnouncements extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleEditAnnouncements: false
        }
    }

    handleClickEditAnnouncements = (e) => {
        this.setState({
            toggleEditAnnouncements: true
        })
    }

    handleClickEditAnnouncements2 = (e) => {
        this.setState({
            toggleEditAnnouncements: false
        })
    }

    render() {
        const { toggleEditAnnouncements } = this.state;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className='row'>
                            <div className='col-sm-12 text-left' id={this.props.announcement_id}>
                                {!toggleEditAnnouncements ?
                                    <h4 style={{ color: '#0093d3' }}>{this.props.title}</h4> :
                                    <input
                                        className="form-control"
                                        name="newTitle"
                                        placeholder="сарлавха"
                                        onChange={this.props.handleInput}
                                        defaultValue="">
                                    </input>
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12 text-justify'>
                                {!toggleEditAnnouncements ?
                                    <p>{this.props.announcement}</p> :
                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        id="comment"
                                        name="newAnnouncement"
                                        defaultValue=""
                                        placeholder="эълон матни"
                                        onChange={this.props.handleInput}>
                                    </textarea>
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 '>
                                <div className='row'>
                                    <div className='col-sm-6 col-xs-6'>
                                        <form onSubmit={this.props.handleSubmitEditAnnouncement} id={this.props.announcement_id}>
                                            {!toggleEditAnnouncements ?
                                                <button
                                                    style={{ width: '100%' }}
                                                    className='btn btn-success'
                                                    onClick={this.handleClickEditAnnouncements}
                                                    id={this.props.announcement_id}>
                                                    <span className='glyphicon glyphicon-edit'></span> ўзгартираман
                                                    </button> :
                                                <button
                                                    style={{ width: '100%' }}
                                                    className='btn btn-success'
                                                    onClick={this.handleClickEditAnnouncements2}>
                                                    <span className='glyphicon glyphicon-floppy-saved'></span> сақлайман
                                                    </button>
                                            }
                                        </form>
                                    </div>
                                    <div className='col-sm-6 col-xs-6'>
                                        <form
                                            onSubmit={this.props.handleSubmitDeleteAnnouncement}
                                            id={this.props.announcement_id}>
                                            <button
                                                style={{ width: '100%' }}
                                                className='btn btn-danger'
                                                onClick={this.handleClickEditAnnouncements2}>
                                                <span className='glyphicon glyphicon-trash'></span> ўчираман
                                                    </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <hr />
                                <p style={{ color: "grey", fontSize: "12px", textAlign: "right" }}>
                                    {Moment(this.props.announ_timestamp).format("LLLL")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}