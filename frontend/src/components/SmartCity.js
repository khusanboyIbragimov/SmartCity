import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import News from "./Central/News/NewsPage/News";
import Bazaar from "./Central/Bazaars/BazaarPage/Bazaar";
import SingleItem from "./Central/Bazaars/BazaarPage/SingleItem";
import Rating from "./Central/Ratings/RatingPage/Rating";
import Survey from "./Central/Surveys/SurveyPage/Survey";
import Giychat from "./Central/Giychat/Giychat";
import Announcement from "./Central/Announcements/AnnouncementPage/Announcement";
import Home from "./Home";
import Profile from "./Central/Profile";
import axios from "axios";


export default class SmartCity extends React.Component {

    constructor() {
        super();
        this.state = {
            userInfo: []
        }
    }

    componentWillMount() {
		axios
			.get("/users/userInfo")
			.then( res => {
				this.setState({
					userInfo: res.data
				})
			})
			.catch( err => {
				console.log(err);
			})
    }

    renderAnnouncement = () => {
        return <Announcement userInfo={this.state.userInfo} />
    }

    renderBazaar = () => {
        return <Bazaar userInfo={this.state.userInfo} />
    }

    renderNews = () => {
        return <News userInfo={this.state.userInfo} />
    }

    renderHome = () => {
        return < Home userInfo={this.state.userInfo} />
    }

    renderRating = () => {
        return < Rating userInfo={this.state.userInfo} />
    }

    renderSurvey = () => {
        return < Survey userInfo={this.state.userInfo} />
    }

    renderProfile = () => {
        return < Profile userInfo={this.state.userInfo} />
    }

    renderSingleItem = (props) => {
        const { id, section } = props.match.params;
        return <SingleItem id={id} section={section} userInfo={this.state.userInfo} />
    }
    
    render() {
        return(
            <div> 
                <Switch>
                    <Route path="/sc/register" component={Register} />                
                    <Route path="/sc/login" component={Login} />
                    <Route path="/sc/news" render={this.renderNews} />
                    <Route exact path="/sc/bazaar" render={this.renderBazaar} />
                    <Route path="/sc/ratings" render={this.renderRating} />
                    <Route path="/sc/survey" render={this.renderSurvey} />
                    <Route path="/sc/announcement" render={this.renderAnnouncement} />
                    <Route path="/sc/profile" render={this.renderProfile} />
                    <Route path="/sc/giychat" component={Giychat} />
                    <Route path='/sc/bazaar/:id/:section' render={this.renderSingleItem} />
                </Switch>
            </div>
        )
    }
}