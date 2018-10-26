import React from "react";
import axios from "axios";
import RenderServiceBox from "./RenderServiceBox";
var ReactS3Uploader = require("react-s3-uploader");


export default class MyServices extends React.Component {

    constructor() {
        super();
        this.state = {
            my_services: [],
            title: "",
            description: "",
            price: "",
            newTitle: "",
            newDescription: "",
            newPrice: "",
            showWaitMessage: false,
            showSubmitButton: false,
            showSubmitButtonWithoutPhoto: true,
            service_imgurl: "",
            completed: ""
        }
    }

    componentDidMount() {
        axios
            .get("/users/getUsersServices")
            .then( (res) => {
                this.setState({
                    my_services: res.data
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
            service_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp/" + img.filename,
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
        const { title, description, price, service_imgurl } = this.state;
        e.preventDefault();
        axios
            .post("/users/insert_service", {
                title: title,
                description: description,
                price: price,
                service_imgurl: service_imgurl
            })
            .then( () => {
                axios
                .get("/users/getUsersServices")
                .then( (res) => {
                    this.setState({
                        my_services: res.data
                    })
                })
                .catch( (err) => {
                    console.log(err);
                })
                this.setState({
                    title: "",
                    description: "",
                    price: "",
                    service_imgurl: ""
                })
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    handleSubmitEditService = (e) => {
        e.preventDefault();
        const { newTitle, newDescription, newPrice } = this.state;
        axios
            .patch(`/users/edit_service`, {
                service_id: e.target.id,
                title: newTitle,
                description: newDescription,
                price: newPrice,
            })
            .then( () => {
                axios
                    .get("/users/getUsersServices")
                    .then( (res) => {
                        this.setState({
                            my_services: res.data
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

    handleSubmitDeleteService = (e) => {
        e.preventDefault();
        axios
            .patch("/users/delete_service", {
                service_id: e.target.id
            })
            .then( (res) => {
                axios
                .get("/users/getUsersServices")
                .then( (res) => {
                    this.setState({
                        my_services: res.data
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
        const { title, description, price, my_services, completed } = this.state;
        return(
            <div>
                Менинг хизматларим
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="сарлавха" onChange={this.handleInput} name="title" value={title} /><br/>
                    <textarea placeholder="тушунтириш" onChange={this.handleInput} name="description" value={description}/><br/>
                    <input placeholder="илтимос нархни яхшироқ ёриштиринг" name="price" onChange={this.handleInput} value={price} />
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
                    {this.state.showSubmitButton?<button>хизмат кўрсатаман</button>:""}
                    {this.state.showSubmitButtonWithoutPhoto?<button>хизмат кўрсатаман</button>:""}
                </form>
                <hr/>
                <RenderServiceBox 
                    my_services={my_services}
                    handleSubmitDeleteService={this.handleSubmitDeleteService}
                    handleSubmitEditService={this.handleSubmitEditService}
                    handleInput={this.handleInput}
                />
            </div>
        )
    }
}