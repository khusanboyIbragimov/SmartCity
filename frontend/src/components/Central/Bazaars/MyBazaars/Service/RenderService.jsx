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
                {/* <form onSubmit={this.props.handleSubmitEditService} id={this.props.service_id}>
                    <div id={this.props.service_id}>
                    {!toggleEditService?<h4>{this.props.title}</h4>: <input name="newTitle" placeholder="сарлавха" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditService?<p>{this.props.description}</p>:<textarea name="newDescription" placeholder="тушунтириш" onChange={this.props.handleInput}></textarea>}<br/>
                    {!toggleEditService?<p>{this.props.price}</p>:<input name="newPrice" type="text" pattern="[0-9]*" placeholder="факат сон" onChange={this.props.handleInput}></input>}<br/>
                    {!toggleEditService? <button onClick={this.handleClickEditService} id={this.props.service_id}>ўзгартираман</button> : <button onClick={this.handleClickEditService2}>сақлайман</button>}
                    </div>
                </form>
                <form onSubmit={this.props.handleSubmitDeleteService} id={this.props.service_id}>
                    <button onClick={this.handleClickEditService2}>ўчираман</button>
                </form> */}



<div className="col-sm-4 col-xs-12">
                    <div className="panel panel-default text-center listing listing-radius listing-success">
                        <div className="panel-heading">
                            {!toggleEditService ?
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
                            <div id={this.props.service_id}>
                                {!toggleEditService ?
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
                                        {!toggleEditService ?
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
                                </div>
                            </div>
                        </div>
                        <div className="panel-footer">
                            <div className="row">
                                <form
                                    onSubmit={this.props.handleSubmitEditService}
                                    id={this.props.service_id}>
                                    {!toggleEditService ?
                                        <button
                                            className="col-sm-6 col-xs-6 btn btn-success"
                                            onClick={this.handleClickEditService}
                                            id={this.props.service_id}>
                                            <span className='glyphicon glyphicon-edit'></span>
                                            &nbsp;ўзгартириш
                                                    </button> :
                                        <button
                                            className="col-sm-6 col-xs-6 btn btn-success"
                                            onClick={this.handleClickEditService2}>
                                            <span className='glyphicon glyphicon-floppy-saved'></span>
                                            &nbsp;сақлаш
                                                    </button>}
                                </form>
                                <form
                                    onSubmit={this.props.handleSubmitDeleteService}
                                    id={this.props.service_id}>
                                    <button
                                        className="col-sm-6 col-xs-6 btn btn-danger"
                                        onClick={this.handleClickEditService2}>
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
