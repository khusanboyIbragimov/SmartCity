import React from "react";
import axios from "axios";
import RenderRentBox from "./RenderRentBox";
import no_image from "../../../../../dummyImages/no_image.jpeg";
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
            .then((res) => {
                this.setState({
                    my_rent_items: res.data
                })
            })
            .catch((err) => {
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
            item4rent_imgurl: "https://s3.us-east-2.amazonaws.com/gulapp2/" + img.filename,
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
                item4rent_imgurl: item4rent_imgurl.length > 0 ? item4rent_imgurl : no_image

            })
            .then(() => {
                axios
                    .get("/users/getUsersRentItems")
                    .then((res) => {
                        this.setState({
                            my_rent_items: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                this.setState({
                    title: "",
                    description: "",
                    price: "",
                    item4rent_imgurl: ""
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleSubmitDeleteRentItem = (e) => {
        e.preventDefault();
        axios
            .patch("/users/delete_rent_item", {
                item_id: e.target.id
            })
            .then((res) => {
                axios
                    .get("/users/getUsersRentItems")
                    .then((res) => {
                        this.setState({
                            my_rent_items: res.data
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
        const { title, description, price, my_rent_items, completed } = this.state;
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <input style={{ borderColor: '#0093d3' }}
                                className='form-control' placeholder="буюм номи" onChange={this.handleInput} name="title" value={title} /><br />
                            <textarea style={{ borderColor: '#0093d3' }}
                                className='form-control' rows="5" id="comment" placeholder="батафсил маълумот" onChange={this.handleInput} name="description" value={description} /><br />
                            <input style={{ borderColor: '#0093d3' }}
                                className='form-control' type="text" pattern="[0-9]*" placeholder="қиймати (фақат сон миллий пулда)" name="price" onChange={this.handleInput} value={price} /><br />
                            {/*
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
                          */}
                            {this.state.showWaitMessage ? <h5>илтимос кутиб туринг...{" "} {completed}</h5> : ""}
                            {this.state.showSubmitButton ? <button className='btn btn-success form-control'>ижарага бериш</button> : ""}
                            {this.state.showSubmitButtonWithoutPhoto ? <button className='btn btn-success form-control'>ижарага бериш</button> : ""}
                        </form>
                        <button onClick={()=> {alert("Баъзи техник сабабларга кура айни пайт сурат юклаб булмайди. ")}}>cурат юкланг</button>
                    </div>
                </div>
                <h3>Ижарага берадиган буюмларим</h3>
                <RenderRentBox
                    my_rent_items={my_rent_items}
                    handleSubmitDeleteRentItem={this.handleSubmitDeleteRentItem}
                    handleInput={this.handleInput}
                />
            </div>
        )
    }
}
