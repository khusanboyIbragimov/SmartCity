import React from 'react';
import RenderNewsPage from "./RenderNewsPage";

export default class RenderNewsPageBox extends React.Component {

    render() {
        return(
            <div>
                    {this.props.news.length !== 0? this.props.news.map(elem => {
                        return <RenderNewsPage
                                key={elem.news_id}
                                text={elem.text}
                                title={elem.title}
                                news_id={elem.news_id}
                                wrongees={elem.wrongees}
                                rightees={elem.rightees}
                                fullname={elem.fullname}
                                userId={this.props.userId}
                                news_imgurl={elem.news_imgurl}
                                news_timestamp={elem.news_timestamp}
                                users_who_agree={ elem.users_who_agree !== null? 
                                    elem.users_who_agree.split(", "):""}
                                users_who_disagree={ elem.users_who_disagree !== null? 
                                    elem.users_who_disagree.split(", "):""}
                                handleSubmitRightNews={this.props.handleSubmitRightNews}
                                handleSubmitWrongNews={this.props.handleSubmitWrongNews}
                            />
                    }):""}
            </div>
        )
    }
}