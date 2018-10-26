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
        return(
            <div>
                <form onSubmit={this.props.handleSubmitEditSaleItem} id={this.props.item_id}>
                    <div id={this.props.item_id}>
                    {!toggleEditSaleItem?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditSaleItem?<p>{this.props.description}</p>:<textarea name="newDescription" placeholder="тушунтириш" onChange={this.props.handleInput}></textarea>}<br/>
                    {!toggleEditSaleItem?<p>{this.props.price}</p>:<input name="newPrice" placeholder="нархи" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditSaleItem?<p>{this.props.condition}</p>:
                    <select name="newCondition" onChange={this.props.handleInput}>
                        <option value="">аҳволи</option>
                        <option value="янги">янги</option>
                        <option value="янгироқ">янгироқ</option>
                        <option value="яхши">яхши</option>
                        <option value="бўлади">бўлади</option>
                        <option value="ёмон">ёмон</option>
                        <option value="запчасть учун">запчасть учун</option>
                    </select>}
                    <p>
                    {Moment(this.props.item_timestamp).format("LLLL")}
                    </p>
                    {!toggleEditSaleItem? <button onClick={this.handleClickEditSaleItem} id={this.props.item_id}>ўзгартираман</button> : <button onClick={this.handleClickEditSaleItem2}>сақлайман</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteSaleItem} id={this.props.item_id}>
                    <button onClick={this.handleClickEditSaleItem2}>ўчираман</button>
                </form>
                <hr />
            </div>
        )
    }
}
