import React from "react";
import axios from "axios";
var Moment = require("moment");
require('moment/locale/uz');

export default class SingleItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleItem: [],
        }
    }

    componentDidMount() {
        const { id, section } = this.props;
        axios
            .patch(`/users/increase_views/${id}/${section}`, {})
            .then(() => {
                axios
                    .get(`/users/get_single_item/${id}/${section}`)
                    .then((res) => {
                        this.setState({
                            singleItem: res.data[0],
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { singleItem } = this.state;
        return (
            <div>
                <div className="container" style={{ backgroundColor: 'white' }}>
                    <div className='row'>
                        <div className='col-sm-6 col-xs-6'>
                        {this.props.section === "service" ? <h5 className='text-left' id='title'><i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-wrench" aria-hidden="true"></i> {singleItem.title}</h5> : ""}
                    {this.props.section === "rent" ? <h5 className='text-left' id='title'><i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-handshake-o" aria-hidden="true"></i> {singleItem.title}</h5> : ""}
                    {this.props.section === "sale" ? <h5 className='text-left' id='title'><i style={{color: 'rgb(241, 159, 77)'}} className="fa fa-shopping-cart" aria-hidden="true"></i> {singleItem.title}</h5> : ""}
                        </div>
                        <div className='col-sm-6 col-xs-6 text-right'>
                        {this.props.section === 'service' ? <h5>Хизмат кўрсатилади</h5> : ""}
                            {this.props.section === 'rent' ? <h5>Ижарага берилади</h5> : ""}
                            {this.props.section === 'sale' ? <h5>Сотилади</h5> : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            {singleItem ? <img src={singleItem.item4sale_imgurl} alt="" style={{ height: '100%', width: '100%' }} /> : ""}
                            {singleItem ? <img src={singleItem.item4rent_imgurl} alt="" style={{ height: '100%', width: '100%' }} /> : ""}
                            {singleItem ? <img src={singleItem.service_imgurl} alt="" style={{ height: '100%', width: '100%' }} /> : ""}    </div>
                        <div className="col-sm-4" >
                            <strong><h4 style={{ color: '#390' }} className="googleFont"><span style={{ color: '#0093d3' }} className="glyphicon glyphicon-check"></span> Батафсил маълумот:</h4></strong><hr />
                            <p className='text-left' style={{ fontSize: '14px' }}>{singleItem ? singleItem.description : ""}.</p>
                        </div>
                        <div className="col-sm-4" >
                            <strong> <h4 style={{ color: '#390' }} className="googleFont "><i style={{ color: '#0093d3' }} className="fa fa-address-card-o" aria-hidden="true"></i>
                                &nbsp;Боғланиш учун:</h4> </strong><hr />
                            <h4 className='text-left'><i className="fa fa-user" aria-hidden="true"></i>
                                &nbsp;{singleItem ? singleItem.fullname : ""}</h4>
                            <h4 className='text-left'><i className="fa fa-mobile" aria-hidden="true"></i>
                                <strong> Телефон:</strong> {" "}{singleItem ? singleItem.phone_number : ""}</h4>
                                <h4 className='text-left'><i className="fa fa-money" aria-hidden="true"></i><strong> Қиймати:</strong> {singleItem ? singleItem.price : ""} <span style={{ color: '#0093d3' }}>сомони</span></h4>
                                {singleItem && singleItem.condition ? 
                                <h4 className='text-left'>
                                <i className="fa fa-heartbeat" aria-hidden="true"></i>&nbsp;
                                <strong>Аҳволи:{" "}</strong>{singleItem.condition}</h4> : ""}
                            <h4 className='text-left'><i className="fa fa-eye" aria-hidden="true"></i>
                                <strong> Кўрилди:</strong> {" "}{singleItem ? singleItem.views : ""}</h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <p className='text-right' style={{ color: '#45594a', fontSize: '12px' }}><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;{singleItem ? Moment(singleItem.item_timestamp).format("LLLL") : ""}</p>
                        </div>
                    </div>
                </div>
                <br /><br /><br />
            </div>
        )
    }
}