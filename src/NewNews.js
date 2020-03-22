import React from 'react';
import Axios from 'axios';
import NewsForm from './NewsForm';

export default class NewNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: { name: '', description: '', photo: 'null'}};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit = (e, event) => {
        e.preventDefault();

        let headers = {};
        if (localStorage.user) {
            headers = JSON.parse(localStorage.user);
        }
        const data = new FormData();
        data.append('event[name]', event.name);
        data.append('event[description]', event.description);
        data.append('event[photo]', event.photo);

        Axios({
            method: 'post',
            url: '/news/new',
            data: data,
            headers: headers })
            .then(response =>{
                this.props.history.push(`/`)})
            .catch(error => {
                this.setState({ errors: error });
                }
            );
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <NewsForm news={this.state.news} errors={this.state.errors} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel} />
            </div>
        );
    }
}