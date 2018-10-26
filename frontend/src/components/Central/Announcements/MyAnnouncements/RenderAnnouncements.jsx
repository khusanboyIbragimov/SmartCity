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
        return(
            <div>
                <form onSubmit={this.props.handleSubmitEditAnnouncement} id={this.props.announcement_id}>
                    <div id={this.props.announcement_id}>
                    {!toggleEditAnnouncements?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput} defaultValue=""></input>} 
                    <br/>
                    {!toggleEditAnnouncements?<p>{this.props.announcement}</p>:<textarea name="newAnnouncement" defaultValue="" placeholder="эълон матни" onChange={this.props.handleInput}></textarea>} 
                    <p>{this.props.fullname}</p>
                    <p>
                    {Moment(this.props.announ_timestamp).format("LLLL")}
                    </p>
                    {!toggleEditAnnouncements? <button onClick={this.handleClickEditAnnouncements} id={this.props.announcement_id}>ўзгартираман</button> : <button onClick={this.handleClickEditAnnouncements2}>сақлайман</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteAnnouncement} id={this.props.announcement_id}>
                    <button onClick={this.handleClickEditAnnouncements2}>ўчираман</button>
                </form>
                <hr />
            </div>
        )
    }
}
