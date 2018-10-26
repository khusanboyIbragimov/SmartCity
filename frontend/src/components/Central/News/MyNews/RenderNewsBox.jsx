import React from 'react';
import RenderNews from "./RenderNews";

export default class RenderNewsBox extends React.Component {
    
    render() {
        return(
            <div>
                <ul>
                    {this.props.news.length !== 0? this.props.news.map(elem => {
                        return <RenderNews 
                                news_id={elem.news_id}
                                key={elem.news_id}
                                text={elem.text}
                                title={elem.title}
                                news_timestamp={elem.news_timestamp}
                                handleInput={this.props.handleInput}
                                handleSubmitEditNews={this.props.handleSubmitEditNews}
                                handleSubmitDeleteNews={this.props.handleSubmitDeleteNews}
                            />
                    }):""}
                </ul> 
            </div>
        )
    }
}