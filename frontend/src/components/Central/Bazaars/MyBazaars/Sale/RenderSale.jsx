import React from 'react';
var Moment = require("moment");
require('moment/locale/uz');

export default class RenderSale extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleEditSaleItem: false
        }
    }

    handleClickEditSaleItem = (e) => {
        this.setState({
            toggleEditSaleItem: true
        })
    }

    handleClickEditSaleItem2 = (e) => {
        this.setState({
            toggleEditSaleItem: false
        })
    }

    render() {
        const { toggleEditSaleItem } = this.state;
        return (
            <div className='container'>
             <div className='row slideanim"'>
                <div className="col-sm-4 col-xs-12">
                    <div className="panel panel-default text-center listing listing-radius listing-success">
                        <div className="panel-heading">
                            {!toggleEditSaleItem ?
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
                                {!toggleEditSaleItem ?
                                    <p className="text-justify">{this.props.description}</p> :
                                    <textarea
                                        style={{ borderColor: '#0093d3' }}
                                        className="form-control"
                                        name="newDescription"
                                        placeholder="батафсил маълумот"
                                        onChange={this.props.handleInput}>
                                    </textarea>}<br />
                                <div className='row'>
                                    <div className="col-sm-12 col-xs-12">
                                        {!toggleEditSaleItem ?
                                            <p className='text-left'><i className="fa fa-money" aria-hidden="true"></i>&nbsp;қиймати:
                                                    &nbsp;{this.props.price} сомони
                                            </p> :
                                            <input
                                                style={{ borderColor: '#0093d3' }}
                                                className="form-control"
                                                name="newPrice"
                                                type="text"
                                                pattern="[0-9]*"
                                                placeholder="қиймати (фақат сон миллий пулда)"
                                                onChange={this.props.handleInput}>
                                            </input>}
                                    </div>
                                    <div className="col-sm-12 col-xs-12">
                                        {!toggleEditSaleItem ?
                                            <p className='text-left'><i className="fa fa-heartbeat" aria-hidden="true"></i>&nbsp;аҳволи:
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
                                            </select>}
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
                                    onSubmit={this.props.handleSubmitEditSaleItem}
                                    id={this.props.item_id}>
                                    {!toggleEditSaleItem ?
                                        <button
                                            className="col-sm-6 col-xs-6 btn btn-success"
                                            onClick={this.handleClickEditSaleItem}
                                            id={this.props.item_id}>
                                            <span className='glyphicon glyphicon-edit'></span>
                                            &nbsp;ўзгартириш
                                                    </button> :
                                        <button
                                            className="col-sm-6 col-xs-6 btn btn-success"
                                            onClick={this.handleClickEditSaleItem2}>
                                            <span className='glyphicon glyphicon-floppy-saved'></span>
                                            &nbsp;сақлаш
                                                    </button>}
                                </form>
                                <form
                                    onSubmit={this.props.handleSubmitDeleteSaleItem}
                                    id={this.props.item_id}>
                                    <button
                                        className="col-sm-6 col-xs-6 btn btn-danger"
                                        onClick={this.handleClickEditSaleItem2}>
                                        <span className='glyphicon glyphicon-trash'></span>
                                        &nbsp;ўчириш
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
