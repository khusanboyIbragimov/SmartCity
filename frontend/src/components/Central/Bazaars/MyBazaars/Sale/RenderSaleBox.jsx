import React from "react";
import RenderSale from "./RenderSale";

export default class RenderSaleBox extends React.Component {
    render() {
        return (
            <div>
                {this.props.my_sale_items.length !== 0 ? this.props.my_sale_items.map(elem => (
                    <RenderSale
                        item_id={elem.item_id}
                        key={elem.item_id}
                        description={elem.description}
                        title={elem.title}
                        price={elem.price}
                        condition={elem.condition}
                        item_timestamp={elem.item_timestamp}
                        handleInput={this.props.handleInput}
                        handleSubmitEditSaleItem={this.props.handleSubmitEditSaleItem}
                        handleSubmitDeleteSaleItem={this.props.handleSubmitDeleteSaleItem}
                    />
                )) : ""}
            </div>
        )
    }
}