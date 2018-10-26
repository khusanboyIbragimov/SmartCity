import React from 'react';
var Moment = require("moment");
require('moment/locale/uz');

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
        return(
            <div>
                <form onSubmit={this.props.handleSubmitEditNews} id={this.props.news_id}>
                    <div id={this.props.news_id}>
                    {!toggleEditNews?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput}></input>} 
                    {!toggleEditNews?<p>{this.props.text}</p>:<input name="newText" placeholder="янгилик матни" onChange={this.props.handleInput}></input>} 
                    <p>{this.props.fullname}</p>
                    <p>
                    {Moment(this.props.news_timestamp).format("LLLL")}
                    </p>
                    {!toggleEditNews? <button onClick={this.handleClickEditNews} id={this.props.news_id}>ўзгартираман</button> : <button onClick={this.handleClickEditNews2}>сақлайман</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteNews} id={this.props.news_id}>
                    <button onClick={this.handleClickEditNews2}>ўчираман</button>
                </form>
                <hr />
            </div>
        )
    }
}
