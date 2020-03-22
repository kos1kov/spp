import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { FormButton } from './ui/Buttons';

export default class NewsInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: {}};
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchAvailablenews = this.fetchAvailablenews.bind(this);

    }

    fetchAvailablenews() {
        Axios.get(`/news/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ news: response.data.data.news[0] });
            })
            .catch(() => this.props.history.push('/'));
    }

    componentDidMount() {
        this.fetchAvailablenews();
    }

    handleDelete() {
        Axios.delete(`/news/${this.props.match.params.id}`)
            .then(() => { this.props.history.push('/');})
            .catch((error) => {
                if (error.response.statusText === 'Unprocessable Entity')
                {
                    this.setState({ errors: error.response.data.errors });
                }
            });
    }

    render() {
        const { news } = this.state;
        const editnewsUrl = `/news/${news.id}/edit`;
        const listnewsUrl = '/';
        const NewsPanel = () => (
            <div>
                <FormButton component={Link} to={editnewsUrl} text="Edit" color="primary" />
                <FormButton onClick={this.handleDelete} text="Delete" color="secondary" />
            </div>
        );
        debugger
        const linkMap = <div>
            <img srcSet={`http://localhost:5000/uploads/${this.state.news.photo}`}
                 src="https://robohash.org/sitsequiquia.png?size=300x300&set=set1"
            />
        </div>;
        let errorsMessage;
        if (this.state.errors)  {
            errorsMessage = <div>
                {this.state.errors.map((error) => (
                    <p key={error.id}>{error}</p>
                ))}
            </div>;
        }
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                {errorsMessage}
                <h2>{news.name}</h2>
                <p>Info: {news.description}</p>
                {linkMap}
                <p>Date: {news.created_at}</p>
                <Grid container direction="row" justify="center">
                    {NewsPanel}
                    <FormButton component={Link} to={editnewsUrl} text="Edit" color="primary" />
                    <FormButton onClick={this.handleDelete} text="Delete" color="secondary" />
                    <FormButton component={Link} to={listnewsUrl} text='Cancel' />
                </Grid>
                <hr/>
            </Grid>
        );
    }
}
