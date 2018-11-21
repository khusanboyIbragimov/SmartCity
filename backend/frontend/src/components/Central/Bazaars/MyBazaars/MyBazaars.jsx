import React from "react";
import MyRentItems from "./Rent/MyRentItems";
import MySaleItems from "./Sale/MySaleItems";
import MyServices from "./Service/MyServices";

export default class MyBazaars extends React.Component {
    constructor() {
        super();
        this.state = {
            action: ""
        }
    }
    handleSelect = (e) => {
        this.setState({
            action: e.target.value
        })
    }
    render() {
        const { action } = this.state;
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <h3>Менинг бозорим</h3>
                </div>
                <div className='col-sm-12'>
                    <select value={action} onChange={this.handleSelect} className="form-control" style={{ borderColor: '#0093d3' }}>
                        <option value="">сайлаш</option>
                        <option value="sale">сотиш</option>
                        <option value="rent">ижарага бериш</option>
                        <option value="service">хизмат кўрсатиш</option>
                    </select>
                    <hr />
                    {action === "rent" ? <MyRentItems /> :
                        action === "sale" ? <MySaleItems /> :
                            action === "service" ? <MyServices /> : ""}
                </div>
                <br /><hr />
            </div>
        )
    }
}