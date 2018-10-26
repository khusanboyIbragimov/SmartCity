import React from "react";
import axios from "axios";
import RenderSaleBox from "./RenderSaleBox";
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
            .then( (res) => {
                this.setState({
                    my_sale_items: res.data
                })
            })
            .catch( (err) => {
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
                item4sale_imgurl: item4sale_imgurl
            })
            .then( () => {
                axios
                .get("/users/getUsersSaleItems")
                .then( (res) => {
                    this.setState({
                        my_sale_items: res.data
                    })
                })
                .catch( (err) => {
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
            .catch( (err) => {
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
            .then( () => {
                axios
                    .get("/users/getUsersSaleItems")
                    .then( (res) => {
                        this.setState({
                            my_sale_items: res.data
                        })
                    })
                    .catch( (err) => {
                        console.log(err);
                    })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    handleSubmitDeleteSaleItem = (e) => {
        e.preventDefault();
        axios
            .patch("/users/delete_sale_item", {
                item_id: e.target.id
            })
            .then( (res) => {
                axios
                .get("/users/getUsersSaleItems")
                .then( (res) => {
                    this.setState({
                        my_sale_items: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }


    render() {
        const { condition, title, description, price, my_sale_items, completed } = this.state;
        return(
            <div>
                Менинг сотиладиган ашёларим
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="сарлавха" onChange={this.handleInput} name="title" value={title} /><br/>
                    <textarea placeholder="тушунтириш" onChange={this.handleInput} name="description" value={description}/><br/>
                    <select value={condition} onChange={this.handleInput} name="condition">
                        <option value="">аҳволи</option>
                        <option value="янги">янги</option>
                        <option value="янгироқ">янгироқ</option>
                        <option value="яхши">яхши</option>
                        <option value="булади">булади</option>
                        <option value="ёмон">ёмон</option>
                        <option value="запчасть учун">запчасть учун</option>
                    </select><br/>
                    <input placeholder="илтимос нархни яхшироқ ёриштиринг" name="price" onChange={this.handleInput} value={price} /><br/>
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
                    /><br/>
                    {this.state.showWaitMessage? <h1>илтимос кутиб туринг...{" "} {completed}</h1>:""}
                    {this.state.showSubmitButton?<button>сотаман</button>:""}
                    {this.state.showSubmitButtonWithoutPhoto?<button>сотаман</button>:""}
                </form>
                <hr/>
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