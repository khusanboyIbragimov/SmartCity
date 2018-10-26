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
        return(
            <div>
                <form onSubmit={this.props.handleSubmitEditRentItem} id={this.props.item_id}>
                    <div id={this.props.item_id}>
                    {!toggleEditRentItem?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditRentItem?<p>{this.props.description}</p>:<textarea name="newDescription" placeholder="тушунтириш" onChange={this.props.handleInput}></textarea>}<br/>
                    {!toggleEditRentItem?<p>{this.props.price}</p>:<input name="newPrice" placeholder="илтимос нархни яхшироқ ёриштиринг" onChange={this.props.handleInput}></input>}<br/>
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
                <hr />
            </div>
        )
    }
}
