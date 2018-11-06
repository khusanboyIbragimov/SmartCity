import React from 'react';
var Moment = require("moment");
require('moment/locale/uz');

export default class RenderRent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleEditRentItem: false
        }
    }

    handleClickEditRentItem = (e) => {
        this.setState({
            toggleEditRentItem: true
        })
    }

    handleClickEditRentItem2 = (e) => {
        this.setState({
            toggleEditRentItem: false
        })
    }

    render() {
        const { toggleEditRentItem } = this.state;
        return (
            <div>
                {/* <form onSubmit={this.props.handleSubmitEditRentItem} id={this.props.item_id}>
                    <div id={this.props.item_id}>
                    {!toggleEditRentItem?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditRentItem?<p>{this.props.description}</p>:<textarea name="newDescription" placeholder="тушунтириш" onChange={this.props.handleInput}></textarea>}<br/>
                    {!toggleEditRentItem?<p>{this.props.price}</p>:<input type="text" pattern="[0-9]*" placeholder="факат сон" name="newPrice" onChange={this.props.handleInput}></input>}<br/>
                    <p>{this.props.fullname}</p>
                    <p>
                    {Moment(this.props.item_timestamp).format("LLLL")}
                    </p>
                    {!toggleEditRentItem? <button onClick={this.handleClickEditRentItem} id={this.props.item_id}>ўзгартираман</button> : <button onClick={this.handleClickEditRentItem2}>сақлайман</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteRentItem} id={this.props.item_id}>
                    <button onClick={this.handleClickEditRentItem2}>ўчираман</button>
                </form>
                <hr /> */}



                <div className="col-sm-4 col-xs-12">
                    <div className="panel panel-default text-center listing listing-radius listing-success">
                        <div className="panel-heading">
                            {!toggleEditRentItem ?
                                <h4>{this.props.title}</h4> :
                                <input
                                    style={{ borderColor: '#0093d3' }}
                                    className="form-control"
                                    name="newTitle"
                                    placeholder="буюм номи"
                                    onChange={this.props.handleInput}>
                                </input>}<br />
                        </div>
                        <div className="panel-body">
                            <div id={this.props.item_id}>
                                {!toggleEditRentItem ?
                                    <p className="text-justify">{this.props.description}</p> :
                                    <textarea
                                        style={{ borderColor: '#0093d3' }}
                                        className="form-control"
                                        name="newDescription"
                                        placeholder="батафсил маълумот"
                                        onChange={this.props.handleInput}>
                                    </textarea>}<br />
                                <div className='row'>
                                    <div className="col-sm-6 col-xs-6">
                                        {!toggleEditRentItem ?
                                            <p><i className="fa fa-money" aria-hidden="true"></i>&nbsp;
                                                    {this.props.price}
                                            </p> :
                                            <input
                                                style={{ borderColor: '#0093d3' }}
                                                className="form-control"
                                                name="newPrice"
                                                type="text"
                                                pattern="[0-9]*"
                                                placeholder="қиймати (фақат сон миллий пулда)"
                                                onChange={this.props.handleInput}>
                                            </input>}<br />
                                    </div>
                                    <div className="col-sm-6 col-xs-6"> */}
                                                    {/* {!toggleEditRentItem ? 
                                                        <p><i className="fa fa-heartbeat" aria-hidden="true"></i>
                                                            &nbsp;{this.props.condition}
                                                        </p> :
                                                        <select
                                                            style={{ borderColor: '#0093d3' }}
                                                            name="newCondition"
                                                            onChange={this.props.handleInput}
                                                            className="form-control">
                                                            <option value="">аҳволи</option>
                                                            <option value="янги">янги</option>
                                                            <option value="янгироқ">янгироқ</option>
                                                            <option value="яхши">яхши</option>
                                                            <option value="бўлади">бўлади</option>
                                                            <option value="ёмон">ёмон</option>
                                                            <option value="запчасть учун">запчасть учун</option>
                                                        </select>
                                                    } */}
                                    </div>
                                </div>
                                <p
                                    className='text-right'
                                    style={{ color: '#45594a', fontSize: '12px' }}>
                                    <i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;
                                                {Moment(this.props.item_timestamp).format("LLLL")}
                                </p>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <form
                                    onSubmit={this.props.handleSubmitEditRentItem}
                                    id={this.props.item_id}>
                                    {!toggleEditRentItem ?
                                        <button
                                            className="col-sm-6 col-xs-6 btn btn-success"
                                            onClick={this.handleClickEditRentItem}
                                            id={this.props.item_id}>
                                            <span className='glyphicon glyphicon-edit'></span>
                                            &nbsp;ўзгартириш
                                                    </button> :
                                        <button
                                            className="col-sm-6 col-xs-6 btn btn-success"
                                            onClick={this.handleClickEditRentItem2}>
                                            <span className='glyphicon glyphicon-floppy-saved'></span>
                                            &nbsp;сақлаш
                                                    </button>}
                                </form>
                                <form
                                    onSubmit={this.props.handleSubmitDeleteRentItem}
                                    id={this.props.item_id}>
                                    <button
                                        className="col-sm-6 col-xs-6 btn btn-danger"
                                        onClick={this.handleClickEditRentItem2}>
                                        <span className='glyphicon glyphicon-trash'></span>
                                        &nbsp;ўчириш
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
