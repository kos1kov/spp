import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormButton } from './ui/Buttons';
import { FormTextField } from './ui/FormTextField';

export default class NewsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { news: {name: '', description: '', photo: null}};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFornewsLayoutFile = this.handleChangeFornewsLayoutFile.bind(this);
    }

    handleChange = (news) => {
        var prevState = {...this.state};
        var updatednews = {...this.state.news};
        updatednews[news.target.name] = news.target.value;
        this.setState({ ...prevState, news: updatednews });
    }

    handleChangeFornewsLayoutFile = (news) => {
        debugger
        var prevState = {...this.state};
        var updatednews = {...this.state.news};
        updatednews[news.target.name] = news.target.files[0];
        this.setState({ ...prevState, news: updatednews });
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        var newNews = {...newProps.news};
        this.setState({ news: newNews });
    }

    render () {
        let errorsMessage;
        if (this.props.errors)  {
            errorsMessage = <div>
                {this.props.errors.message}
            </div>;
        }
        const { news } = this.state;
        return (
            <form onSubmit={(e) => { this.props.handleSubmit(e, this.state.news); }}>
                {errorsMessage}
                <Grid container direction="column" justify="center" alignItems="center">
                    <h1>News</h1>
                    <FormTextField
                        value={news.name}
                        name="name"
                        label="Name"
                        onChange={this.handleChange}
                    />
                    <FormTextField
                        value={news.description}
                        name="description"
                        label="Description"
                        multiline
                        rows="3"
                        onChange={this.handleChange}
                    />
                    <h1>Picture</h1>
                    <input type="file"
                           name="photo"
                           accept="image/*"
                           onChange={this.handleChangeFornewsLayoutFile}
                    />
                    <div className="btn-group">
                        <FormButton text='Save' color="primary" />
                        <FormButton text='Cancel' onClick={this.props.handleCancel} />
                    </div>
                </Grid>
            </form>
        );
    }
}