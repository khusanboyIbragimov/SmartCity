import React from "react";
import RenderService from "./RenderService";

export default class RenderServiceBox extends React.Component {
    render() {
        return (
            <div>
                {this.props.my_services.length !== 0 ? this.props.my_services.map(elem => {
                    return <RenderService
                        service_id={elem.service_id}
                        key={elem.service_id}
                        description={elem.description}
                        title={elem.title}
                        price={elem.price}
                        handleInput={this.props.handleInput}
                        handleSubmitEditService={this.props.handleSubmitEditService}
                        handleSubmitDeleteService={this.props.handleSubmitDeleteService}
                    />
                }) : ""}
            </div>
        )
    }
}