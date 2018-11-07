import React from "react";
import { Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default class RenderRating extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            isUserLogged: false
        }
    }


    handleHide = () => {
        this.setState({ show: false });
    }

    handleIsUserLogged = () => {
        this.setState({ isUserLogged: false });
    }

    checkUser = () => {
        window.alert("please login")
    }

    render() {
        const { ratingScore, changeRating, selectRatingQuestion, userId, users_who_rated } = this.props;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-6'>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title" style={{ color: "#0093d3", fontSize: '22px' }}>
                                <span style={{color: 'rgb(241, 159, 77)'}} className='glyphicon glyphicon-star'></span> 
                                &nbsp;{this.props.rating_question}
                                </h3>
                            </div>
                            <div className="panel-body">
                                <b><h3
                                    style={{ color: "#e7711b", fontSize: '22px' }}>
                                    {Number(this.props.ratings).toFixed(1)} <span className='glyphicon glyphicon-stats'></span>
                                </h3></b>
                                <StarRatings
                                    starRatedColor="#e7711b"
                                    rating={Number(this.props.ratings)}
                                    numberOfStars={5}
                                    starEmptyColor="grey"
                                    starDimension="28px"
                                />
                                <div className="modal-container" >
                                    {userId && users_who_rated.indexOf(userId.toString()) !== -1 ? <button
                                        className='btn btn-success'
                                    > <span className='glyphicon glyphicon-ok' ></span>
                                        &nbsp; баҳолаганман
                                    </button> : !userId ? <button
                                            className='btn btn-success'
                                            onClick={() => this.setState({ isUserLogged: true })}
                                        ><span className='glyphicon glyphicon-star'></span>
                                            &nbsp;баҳоланг
                                     </button> : <button
                                                className='btn btn-success'
                                                onClick={() => this.setState({ show: true })}
                                            > <span  className='glyphicon glyphicon-star'></span>
                                                &nbsp; баҳолайман
                                    </button>}
                                    <Modal
                                        show={this.state.show}
                                        onHide={this.handleHide}
                                        container={this}
                                        aria-labelledby="contained-modal-title"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title">
                                                <div 
                                                    className="panel-title" 
                                                    style={{ color: "#0093d3", fontSize: '22px' }}
                                                    > 
                                                    <b><span className='glyphicon glyphicon-list-alt'></span></b> 
                                                    &nbsp;{this.props.rating_question}
                                                </div>                                            
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div >
                                                <StarRatings
                                                    starRatedColor="#e7711b"
                                                    rating={ratingScore}
                                                    changeRating={changeRating}
                                                    numberOfStars={5}
                                                    name={"this.props.rating_question_id"}
                                                    starHoverColor="#e7711b"
                                                />
                                                <textarea className='form-control' placeholder='илтимос фикрингизни ёзиб колдиринг' onInput={this.props.handleInputFeedback} name="feedback">
                                                </textarea>
                                            </div>
                                        </Modal.Body>
                                        <form onSubmit={selectRatingQuestion} id={this.props.rating_question_id} onClick={this.handleHide}>
                                            <button className='btn btn-success' onClick={this.handleHide}><span  className='glyphicon glyphicon-star'></span>
                                                &nbsp;баҳолайман</button>
                                            <br /><br />
                                        </form>
                                    </Modal>
                                    <Modal
                                        show={this.state.isUserLogged}
                                        onHide={this.handleIsUserLogged}
                                        container={this}
                                        aria-labelledby="contained-modal-title"
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title">
                                                <h3 style={{ color: '#0093d3' }}>{this.props.rating_question}</h3>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Илтимос аккаунтингизга киринг ва ўз баҳоингизни қолдиринг.
                                            Мана шу кўтарилган мавзуни яхши бўлишига ўз ҳиссангизни қўшинг.
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='btn btn-danger' onClick={this.handleIsUserLogged}>ёпиш</button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                                <p className='text-left'> {this.props.feedbacks}<span onClick={this.props.moreComments} id={this.props.rating_question_id}>...яна фикрлар</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-3'></div>
                </div>
            </div>
        )
    }
}