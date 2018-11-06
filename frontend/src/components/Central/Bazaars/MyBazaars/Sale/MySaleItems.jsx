import React from "react";
import axios from "axios";
import RenderSaleBox from "./RenderSaleBox";
import no_image from "../../../../../dummyImages/no_image.jpeg";
var ReactS3Uploader = require("react-s3-uploader");

export default class MyRentItems extends React.Component {

    constructor() {
        super();
        this.state = {
            my_sale_items: [],
            title: "",
            description: "",
            price: "",
            condition: "",
            newTitle: "",
            newDescription: "",
            newPrice: "",
            newCondition: "",
            showWaitMessage: false,
            showSubmitButton: false,
            showSubmitButtonWithoutPhoto: true,
            item4sale_imgurl: "",
            completed: ""
        }
    }

    componentDidMount() {
        axios
            .get("/users/getUsersSaleItems")
            .then((res) => {
                this.setState({
                    my_sale_items: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onUploadProgress = (percent) => {
        this.setState({
            completed: percent + "%"
        })

    }

    onUploadFinish = (img) => {
        this.setState({
            item4sale_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp/" + img.filename,
            showWaitMessage: false,
            showSubmitButton: true
        })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = () => {
        this.setState({
            showWaitMessage: true,
            showSubmitButtonWithoutPhoto: false
        })
    }

    handleSubmit = (e) => {
        const { title, description, price, condition, item4sale_imgurl } = this.state;
        e.preventDefault();
        axios
            .post("/users/insert_sale_item", {
                title: title,
                description: description,
                price: price,
                condition: condition,
                item4sale_imgurl: item4sale_imgurl.length > 0 ? item4sale_imgurl : no_image
            })
            .then(() => {
                axios
                    .get("/users/getUsersSaleItems")
                    .then((res) => {
                        this.setState({
                            my_sale_items: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                this.setState({
                    title: "",
                    description: "",
                    price: "",
                    condition: "",
                    item4sale_imgurl: ""
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleSubmitEditSaleItem = (e) => {
        e.preventDefault();
        const { newTitle, newDescription, newPrice, newCondition } = this.state;
        axios
            .patch(`/users/edit_sale_item`, {
                item_id: e.target.id,
                title: newTitle,
                description: newDescription,
                price: newPrice,
                condition: newCondition
            })
            .then(() => {
                axios
                    .get("/users/getUsersSaleItems")
                    .then((res) => {
                        this.setState({
                            my_sale_items: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleSubmitDeleteSaleItem = (e) => {
        e.preventDefault();
        axios
            .patch("/users/delete_sale_item", {
                item_id: e.target.id
            })
            .then((res) => {
                axios
                    .get("/users/getUsersSaleItems")
                    .then((res) => {
                        this.setState({
                            my_sale_items: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        const { condition, title, description, price, my_sale_items, completed } = this.state;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <input style={{ borderColor: '#0093d3' }}
                                className='form-control' placeholder="буюм номи" onChange={this.handleInput} name="title" value={title} /><br />
                            <textarea style={{ borderColor: '#0093d3' }}
                                className='form-control' rows="5" id="comment" placeholder="батафсил маълумот" onChange={this.handleInput} name="description" value={description} /><br />
                            <select className="form-control" value={condition} onChange={this.handleInput} name="condition" style={{ borderColor: '#0093d3' }}>
                                <option value="">аҳволи</option>
                                <option value="янги">янги</option>
                                <option value="янгироқ">янгироқ</option>
                                <option value="яхши">яхши</option>
                                <option value="булади">булади</option>
                                <option value="ёмон">ёмон</option>
                                <option value="запчасть учун">запчасть учун</option>
                            </select><br /><br />
                            <input style={{ borderColor: '#0093d3' }}
                                className='form-control' type="text" pattern="[0-9]*" placeholder="қиймати (фақат сон миллий пулда)" name="price" onChange={this.handleInput} value={price} /><br />
                            <h5 className='text-left'><i className="fa fa-file-image-o" aria-hidden="true"></i>
                                &nbsp;Расм юкланг:</h5>
                            <ReactS3Uploader
                                signingUrl="/s3/sign"
                                signingUrlMethod="GET"
                                accept="image/*"
                                uploadRequestHeaders={{
                                    'x-amz-acl': 'public-read'
                                }}
                                onFinish={this.onUploadFinish}
                                onProgress={this.onUploadProgress}
                                onClick={this.handleClick}
                            /><br />
                            {this.state.showWaitMessage ? <h5>илтимос кутиб туринг...{" "} {completed}</h5> : ""}
                            {this.state.showSubmitButton ? <button className='btn btn-success form-control'>сотиш</button> : ""}
                            {this.state.showSubmitButtonWithoutPhoto ? <button className='btn btn-success form-control'>сотиш</button> : ""}
                        </form>
                    </div>
                </div>
                <h3>Cотиладиган буюмларим</h3>
                <RenderSaleBox
                    my_sale_items={my_sale_items}
                    handleSubmitDeleteSaleItem={this.handleSubmitDeleteSaleItem}
                    handleSubmitEditSaleItem={this.handleSubmitEditSaleItem}
                    handleInput={this.handleInput}
                />
            </div>
        )
    }
}