import React from 'react';
import RenderNews from "./RenderNews";

export default class RenderNewsBox extends React.Component {

    render() {
        return(
            <div className='row'>
                    {this.props.news.length !== 0? this.props.news.map(elem => (
                      <div className="col-sm-6 com-xs-12">
                            <RenderNews
                                news_id={elem.news_id}
                                key={elem.news_id}
                                text={elem.text}
                                title={elem.title}
                                news_timestamp={elem.news_timestamp}
                                handleInput={this.props.handleInput}
                                handleSubmitDeleteNews={this.props.handleSubmitDeleteNews}
                            />
                      </div>
                    )):""}
            </div>
        )
    }
}
