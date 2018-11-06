import React from "react";
import axios from "axios";
import RenderServiceBox from "./RenderServiceBox";
import no_image from "../../../../../dummyImages/no_image.jpeg";

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
                service_imgurl: service_imgurl.length > 0? service_imgurl: no_image
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
        const { title, description, price, my_services } = this.state;
        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <input style={{ borderColor: '#0093d3' }}
                                className='form-control' placeholder="хизмат номи" onChange={this.handleInput} name="title" value={title} /><br />
                            <textarea style={{ borderColor: '#0093d3' }}
                                className='form-control' rows="5" id="comment" placeholder="батафсил маълумот" onChange={this.handleInput} name="description" value={description} /><br />
                            <input style={{ borderColor: '#0093d3' }}
                                className='form-control' type="text" pattern="[0-9]*" placeholder="қиймати (фақат сон миллий пулда)" name="price" onChange={this.handleInput} value={price} /><br />
                            <button className='btn btn-success form-control'>хизмат кўрсатиш</button>
                        </form>
                    </div>
                </div>
                <h3>Xизматларим</h3>
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