import React from "react";
import { Button, Modal } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default class Survey extends React.Component {
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
        const { rating, changeRating, selectRatingQuestion,userId, users_who_rated } = this.props;
        return (
            <div>
                <h1>{this.props.survey_question}</h1> 
                <p>{this.props.feedbacks}<span onClick={this.props.moreComments} id={this.props.survey_question_id}>...яна фикрлар</span></p>
                    <StarRatings
                    starRatedColor="yellow"
                    rating={Number(this.props.ratings)}
                    numberOfStars={5}
                    starEmptyColor="grey"
                />        
                {/* <Button onClick={() => this.setState({ open: !this.state.open})}>
                    comments
                    </Button>
                    <Collapse in={this.state.open}>
                        <div>
                            <Well>{this.props.feedbacks}</Well>
                        </div>
        </Collapse>*/}
                <div className="modal-container" style={{ height: 200 }}> 
                    {userId && users_who_rated.indexOf(userId.toString()) !== -1?<Button
                        bsStyle="primary"
                        bsSize="large"
                    >
                        баҳолаганман 
                     </Button> :!userId?<Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => this.setState({ isUserLogged: true })}
                    >
                        баҳоланг
                     </Button>:<Button
                        bsStyle="primary"
                        bsSize="large"
                        onClick={() => this.setState({ show: true })}
                    >
                        баҳолайман 
                     </Button>}
                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                {this.props.survey_question}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div >
                                <StarRatings
                                    starRatedColor="#9b870c"
                                    rating={rating}
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    name={"this.props.survey_question_id"}
                                    starHoverColor="#9b870c"
                                />
                                <textarea onInput={this.props.handleInputFeedback} name="feedback">
                                </textarea>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleHide}>ёпаман</Button>
                        </Modal.Footer>
                        <form onSubmit={selectRatingQuestion} id={this.props.survey_question_id} onClick={this.handleHide}>
                        <button onClick={this.handleHide}>баҳолайман</button>
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
                                {this.props.survey_question}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Илтимос аккаунтингизга киринг ва ўз баҳоингизни қолдиринг.
                            Мана шу кутарилган мавзуни яхши бўлишига ўз ҳиссангизни қўшинг.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleIsUserLogged}>ёпаман</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <hr />
            </div>   
        )
    }
}