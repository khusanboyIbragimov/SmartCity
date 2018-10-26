import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import News from "./Central/News/NewsPage/News";
import Bazaar from "./Central/Bazaars/BazaarPage/Bazaar";
import Survey from "./Central/Surveys/SurveyPage/Survey";
import Giychat from "./Central/Giychat/Giychat";
import Announcement from "./Central/Announcements/AnnouncementPage/Announcement";
import Home from "./Home";
import Profile from "./Central/Profile";
import axios from "axios";


export default class Gulapp extends React.Component {

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

    renderSurvey = () => {
        return < Survey userInfo={this.state.userInfo} />
    }

    renderProfile = () => {
        return < Profile userInfo={this.state.userInfo} />
    }
    
    render() {
        return(
            <div> 
                <Switch>
                    <Route path="/ga/register" component={Register} />
                    <Route path="/ga/news" render={this.renderNews} />
                    <Route path="/ga/bazaar" render={this.renderBazaar} />
                    <Route path="/ga/survey" render={this.renderSurvey} />
                    <Route path="/ga/announcement" render={this.renderAnnouncement} />
                    <Route path="/ga/home" render={this.renderHome} />
                    <Route path="/ga/profile" render={this.renderProfile} />
                    <Route path="/ga/giychat" component={Giychat} />
                </Switch>
            </div>
        )
    }
}