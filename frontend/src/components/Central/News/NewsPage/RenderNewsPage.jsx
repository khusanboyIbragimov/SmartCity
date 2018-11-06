import React from 'react';
import { Button, Modal } from 'react-bootstrap';
var Moment = require("moment");
require('moment/locale/uz');
let gulakandozFiles = require("./gulakandozFiles");
let api = gulakandozFiles.default;
let gulakandozHistory = api[0];
let images = api[1];

export default class RenderNewsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            isUserLogged: false,
            showHistoryText: false
        }
    }

    handleIsUserLogged = () => {
        this.setState({
            isUserLogged: false
        })
    }

    handleClickHistoryText = (e) => {
        this.setState({
            showHistoryText: !this.state.showHistoryText
        })
    }

    render() {
        const { users_who_agree, userId, users_who_disagree,
            news_id, title, text, news_imgurl, news_timestamp,
            fullname, rightees, wrongees,
            handleSubmitRightNews, handleSubmitWrongNews,
        } = this.props;
        const { showHistoryText } = this.state;
        return (
            <div className='container'>
                        <div className='row'>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 style={{ color: '#0093d3' }} className="h4"><span className='glyphicon glyphicon-globe'></span> {title}</h4>
                                </div>
                                <div className="panel-body">
                                    <div className='col-sm-4'>
                                        <img src={news_imgurl ? news_imgurl :
                                            images[Math.floor(Math.random() * images.length)]}
                                            alt="habar surati"
                                            style={{ height: "250px", width: "100%" }}
                                            className="img-rounded"
                                        />
                                        <div className='row'>
                                            <div className='col-sm-12 col-xs-12 text-left'>
                                                <h5 style={{ color: "grey" }}><i className="fa fa-pencil" aria-hidden="true"></i>
                                                    &nbsp;{fullname}</h5>
                                            </div>
                                        </div>
                                        {userId ? <div className='row'>
                                            <div className='col-sm-6 col-xs-6'>
                                                <form onSubmit={handleSubmitRightNews} id={news_id}>
                                                    {userId && users_who_agree.indexOf(userId.toString()) !== -1 ?
                                                        <button style={{ width: '100%' }} className='btn btn-success' disabled>ҳақиқат{" "}{rightees}</button> :
                                                        <button style={{ width: '100%' }} className='btn btn-success'>ҳақиқат{" "}{rightees}</button>}
                                                </form>                                    </div>
                                            <div className='col-sm-6 col-xs-6'>
                                                <form onSubmit={handleSubmitWrongNews} id={news_id}>
                                                    {userId && users_who_disagree.indexOf(userId.toString()) !== -1 ?
                                                        <button style={{ width: '100%' }} className='btn btn-danger' disabled>ғийбат&nbsp;&nbsp;{" "}{wrongees}</button> :
                                                        <button style={{ width: '100%' }} className='btn btn-danger'>ғийбат&nbsp;&nbsp;{" "}{wrongees}</button>}
                                                </form>                                    </div>
                                        </div> :
                                            <div className="row">
                                                <div className='col-sm-6 col-xs-6'>
                                                    <button style={{ width: '100%' }} className='btn btn-success'
                                                        onClick={() => this.setState({ isUserLogged: true })}>ҳақиқат{" "}{rightees}
                                                    </button>
                                                </div>
                                                <div className='col-sm-6 col-xs-6'>
                                                    <button style={{ width: '100%' }} className='btn btn-danger'
                                                        onClick={() => this.setState({ isUserLogged: true })}>ғийбат&nbsp;&nbsp;{" "}{wrongees}
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className='col-sm-8'>
                                        <div key={news_id}>
                                            <div style={{ textAlign: 'left' }}><div>{text.length > 150 ? <div className="text-justify">{text}</div> : <div>{text}<br /><br />
                                                <blockquote className={`text-justify ${showHistoryText ? "show" : "hide"} pagination`} onClick={this.handleClickHistoryText}>
                                                    {gulakandozHistory[Math.floor(Math.random() * gulakandozHistory.length)]}<hr />
                                                    <cite>Ғулакандоз: кеча, бугун, эртага. Хужанд - 2002 йил</cite>
                                                </blockquote>
                                                <div
                                                    onClick={this.handleClickHistoryText}
                                                    className={`${!showHistoryText ? "show" : "hide"}`}
                                                >
                                                    <button className="btn-link">Tарих зарвараклари...</button>
                                                </div>
                                            </div>}
                                            </div></div>
                                            <Modal
                                                show={this.state.isUserLogged}
                                                onHide={this.handleIsUserLogged}
                                                container={this}
                                                aria-labelledby="contained-modal-title"
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title">
                                                        {this.props.title}
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    Илтимос аккаўнтингизга киринг ва ушбу хабарни хақиқатга
                                                    яқинлаштиришга ўз ҳиссангизни қўшинг. Унутманг бу жамиятда
                                                    сизнинг хам ўрнингиз бор
                                        </Modal.Body>
                                                <Modal.Footer>
                                                    <Button onClick={this.handleIsUserLogged}>ёпаман</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                    <div className='col-sm-12 text-right'>
                                        <span style={{ color: "grey", fontSize: "10px", textAlign: "center" }} className='glyphicon glyphicon-time'>
                                            &nbsp;{Moment(news_timestamp).format("LLLL")}<br />
                                        </span>
                                    </div>
                                </div>
                            </div>
                </div>
            </div>
        )
    }
}
