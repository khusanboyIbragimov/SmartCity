import React from 'react';
import RenderMyAnnouncements from "./RenderMyAnnouncements";

export default class RenderMyAnnouncementsBox extends React.Component {

    render() {
        return(
            <div className="row">
                    {this.props.announcements.length !== 0? this.props.announcements.map(elem => (
                        <div className="col-sm-6 col-xs-12">
                           <RenderMyAnnouncements
                                  key={elem.announcement_id}
                                  announcement_id={elem.announcement_id}
                                  announcement={elem.announcement}
                                  title={elem.title}
                                  announ_timestamp={elem.announ_timestamp}
                                  handleInput={this.props.handleInput}
                                  handleSubmitDeleteAnnouncement={this.props.handleSubmitDeleteAnnouncement}
                            />
                        </div>
                    )):""}
            </div>
        )
    }
}
