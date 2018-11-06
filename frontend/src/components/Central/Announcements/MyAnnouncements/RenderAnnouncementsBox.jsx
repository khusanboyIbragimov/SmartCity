import React from 'react';
import RenderAnnouncements from "./RenderAnnouncements";

export default class RenderAnnouncementsBox extends React.Component {

    render() {
        return(
            <div>
                    {this.props.announcements.length !== 0? this.props.announcements.map(elem => {
                        return <RenderAnnouncements
                                key={elem.announcement_id}
                                announcement_id={elem.announcement_id}
                                announcement={elem.announcement}
                                title={elem.title}
                                announ_timestamp={elem.announ_timestamp}
                                handleInput={this.props.handleInput}
                                handleSubmitEditAnnouncement={this.props.handleSubmitEditAnnouncement}
                                handleSubmitDeleteAnnouncement={this.props.handleSubmitDeleteAnnouncement}
                            />
                    }):""}
            </div>
        )
    }
}