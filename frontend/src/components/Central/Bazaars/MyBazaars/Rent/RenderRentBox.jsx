import React from "react";
import RenderRent from "./RenderRent";

export default class RenderRentBox extends React.Component {
    render() {
        return (
            <div>
            {this.props.my_rent_items.length !== 0 ? this.props.my_rent_items.map(elem => (
                    <RenderRent
                        item_id={elem.item_id}
                        key={elem.item_id}
                        description={elem.description}
                        title={elem.title}
                        price={elem.price}
                        item_timestamp={elem.item_timestamp}
                        handleInput={this.props.handleInput}
                        handleSubmitEditRentItem={this.props.handleSubmitEditRentItem}
                        handleSubmitDeleteRentItem={this.props.handleSubmitDeleteRentItem}
                    />
                )) : ""}
            </div>
        )
    }
}