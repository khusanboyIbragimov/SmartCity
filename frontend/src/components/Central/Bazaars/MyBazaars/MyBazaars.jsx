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
        return(
            <div>
                <h3>Менинг бозорим</h3>
                <br/><hr/>
                <h6>Нима қилмоқчисиз?</h6>
                <select value={action} onChange={this.handleSelect}>
                    <option value="">сайлаш</option>
                    <option value="sale">сотаман</option>
                    <option value="rent">ижарага бераман</option>
                    <option value="service">хизмат кўрсатаман</option>
                </select>
                <hr/>
                {action === "rent"? <MyRentItems/>: 
                 action === "sale"? <MySaleItems/>:
                 action === "service"? <MyServices/>:""}
            </div>
        )
    }
}