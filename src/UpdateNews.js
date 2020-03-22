import React from 'react';
import Axios from 'axios';
import NewsForm from './NewsForm';

export default class UpdatedNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: {name: '', description: '', photo: null}, prev_news: {name: '', description: '', photo: null}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        Axios({
            method: 'get',
            url: `/news/${this.props.match.params.id}`
        })
            .then(res => { this.setState({ prev_news: res.data.data.news[0] });});
    }

    handleSubmit = (e, news) => {
        e.preventDefault();
        const data = new FormData();
        data.append('event[name]', news.name);
        data.append('event[description]', news.description);
        data.append('event[photo]', news.photo);

        Axios({
            method: 'patch',
            url: `/news/${this.props.match.params.id}`,
            data: data
        })
            .then(() => this.props.history.push(`/news/${this.props.match.params.id}`))
            .catch(error => {
                switch (error.response.statusText) {
                    case 'Unprocessable Entity':
                        this.setState({ errors: error.response.data });
                        break;
                    case 'Unauthorized':
                        this.setState({ errors: error.response.data.errors });
                        break;
                    case 'Not Found':
                        this.setState({ errors: ['You can\'t do this'] });
                        break;
                }
            });
    }

    handleCancel = () => {
        this.props.history.push(`/news/${this.state.event.id}`);
    }
    render() {
        return (
            <div>
                <NewsForm news={this.state.prev_news} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
            </div>
        );
    }
}
