import React from 'react';

export default class RenderService extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            toggleEditService: false
        }
    }

    handleClickEditService = (e) => {
        this.setState({
            toggleEditService: true
        })
    }

    handleClickEditService2 = (e) => {
        this.setState({
            toggleEditService: false
        })
    }

    render() {
        const { toggleEditService } = this.state;
        return(
            <div>
                <form onSubmit={this.props.handleSubmitEditService} id={this.props.service_id}>
                    <div id={this.props.service_id}>
                    {!toggleEditService?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditService?<p>{this.props.description}</p>:<textarea name="newDescription" placeholder="тушунтириш" onChange={this.props.handleInput}></textarea>}<br/>
                    {!toggleEditService?<p>{this.props.price}</p>:<input name="newPrice" placeholder="илтимос нархни яхшироқ ёриштиринг" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditService? <button onClick={this.handleClickEditService} id={this.props.service_id}>ўзгартираман</button> : <button onClick={this.handleClickEditService2}>сақлайман</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteService} id={this.props.service_id}>
                    <button onClick={this.handleClickEditService2}>ўчираман</button>
                </form>
                <hr />
            </div>
        )
    }
}
