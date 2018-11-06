import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';


export default class RenderSurvey extends React.Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        }
    }

    handleModal = () => {
        this.setState({
            isLogged: !this.state.isLogged
        })
    }

    handleInput = (e) => {
        console.log(e.target.value)
        // console.log(e.target.id)
    }

    render() {
        const { value, text, survey_question_id,
            survey_question_options_id, user_id, users } = this.props;
        return (

            <div>
                <div>
                    <div className='row'>
                        <div className='col-sm-1 col-xs-1'>
                            {user_id ? <div>
                                {users.indexOf(user_id.toString()) !== -1 ?
                                    <input
                                        // style={{backgroundColor: "red", borderColor: '#0093d3', height: "15px"}}
                                        type="checkbox"
                                        name="checkbox"
                                        checked={true}
                                        disabled
                                        onChange={this.props.handleVote}
                                        id={survey_question_id}
                                        value={survey_question_options_id}
                                    />
                                    //         <button
                                    //             style={{ width: '100%' }}
                                    //             className='btn btn-danger'
                                    //             onChange={this.props.handleVote}
                                    //             disabled
                                    //             id={survey_question_id}
                                    //             value={survey_question_options_id}
                                    //         ><span >{text}</span>&nbsp;&nbsp;&nbsp;
                                    // <span >{value}</span>
                                    //         </button> 
                                    :
                                    // <button
                                    //     style={{ backgroundColor: "green" }}
                                    //     onChange={this.props.handleVote}
                                    //     id={survey_question_id}
                                    //     value={survey_question_options_id}
                                    //     >{text}&nbsp;&nbsp;&nbsp;
                                    //     <span>{value}</span>
                                    // </button>
                                    <input
                                        style={{ backgroundColor: "green", borderColor: '#0093d3', height: "15px" }}
                                        type="checkbox"
                                        name="checkbox"
                                        checked={false}
                                        onChange={this.props.handleVote}
                                        id={survey_question_id}
                                        value={survey_question_options_id}
                                    />
                                }
                            </div> :
                                <div>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        checked={false}
                                        onChange={this.handleModal}
                                    />
                                </div>}
                        </div>
                        <div className='col-sm-9 col-xs-9 text-left'>
                            {text}
                        </div>
                        <div className='col-sm-1 col-xs-1 text-right'>
                            <i className="fa fa-line-chart" aria-hidden="true">&nbsp;{value}</i>
                        </div>
                        <div className='col-sm-1 col-xs-1 text-right'>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <ProgressBar striped active now={Number(value) > 90 ? Number(value) / 10 : Number(value)} />
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.state.isLogged}
                    onHide={this.handleModal}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Body>
                        Илтимос аккаўнтингизга киринг ва ушбу хабарни хақиқатга
                        яқинлаштиришга ўз ҳиссангизни қўшинг. Унутманг бу жамиятда
                        сизнинг хам ўрнингиз бор
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.handleModal}>ёпаман</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}