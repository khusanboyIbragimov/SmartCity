import React from "react";
import axios from "axios";
import RenderRentBox from "./RenderRentBox";
var ReactS3Uploader = require("react-s3-uploader");


export default class MyRentItems extends React.Component {

    constructor() {
        super();
        this.state = {
            my_rent_items: [],
            title: "",
            description: "",
            price: "",
            newTitle: "",
            newDescription: "",
            newPrice: "",
            showWaitMessage: false,
            showSubmitButton: false,
            showSubmitButtonWithoutPhoto: true,
            item4rent_imgurl: "",
            completed: ""
        }
    }

    componentDidMount() {
        axios
            .get("/users/getUsersRentItems")
            .then( (res) => {
                this.setState({
                    my_rent_items: res.data
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onUploadProgress = (percent) => {
        this.setState({
            completed: percent + "%"
        })

    }

    onUploadFinish = (img) => {
        this.setState({
            item4rent_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp/" + img.filename,
            showWaitMessage: false,
            showSubmitButton: true
        })
    }

    handleClick = () => {
        this.setState({
            showWaitMessage: true,
            showSubmitButtonWithoutPhoto: false
        })
    }

    handleSubmit = (e) => {
        const { title, description, price, item4rent_imgurl } = this.state;
        e.preventDefault();
        axios
            .post("/users/insert_rent_item", {
                title: title,
                description: description,
                price: price,
                item4rent_imgurl: item4rent_imgurl

            })
            .then( () => {
                axios
                .get("/users/getUsersRentItems")
                .then( (res) => {
                    this.setState({
                        my_rent_items: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })
                this.setState({
                    title: "",
                    description: "",
                    price: "",
                    item4rent_imgurl: ""
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    handleSubmitEditRentItem = (e) => {
        e.preventDefault();
        const { newTitle, newDescription, newPrice } = this.state;
        axios
            .patch(`/users/edit_rent_item`, {
                item_id: e.target.id,
                title: newTitle,
                description: newDescription,
                price: newPrice
            })
            .then( () => {
                axios
                    .get("/users/getUsersRentItems")
                    .then( (res) => {
                        this.setState({
                            my_rent_items: res.data
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

    handleSubmitDeleteRentItem = (e) => {
        e.preventDefault();
        axios
            .patch("/users/delete_rent_item", {
                item_id: e.target.id
            })
            .then( (res) => {
                axios
                .get("/users/getUsersRentItems")
                .then( (res) => {
                    this.setState({
                        my_rent_items: res.data
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
        const { title, description, price, my_rent_items, completed } = this.state;
        return(
            <div>
                Менинг ижарага берадиган ашёларим
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="сарлавха" onChange={this.handleInput} name="title" value={title} /><br/>
                    <textarea placeholder="тушунтириш" onChange={this.handleInput} name="description" value={description}/><br/>
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
                    {this.state.showSubmitButton?<button>ижарага бераман</button>:""}
                    {this.state.showSubmitButtonWithoutPhoto?<button>ижарага бераман</button>:""}
                </form>
                <hr/>
                <RenderRentBox 
                    my_rent_items={my_rent_items}
                    handleSubmitDeleteRentItem={this.handleSubmitDeleteRentItem}
                    handleSubmitEditRentItem={this.handleSubmitEditRentItem}
                    handleInput={this.handleInput}
                />
            </div>
        )
    }
}