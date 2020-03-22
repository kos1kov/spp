import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import {Toolbar} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Axios from "axios";

export default class App extends React.Component {
    constructor(props) {
        super(props)
        debugger
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        Axios({
            method: 'get',
            url: '/news',
        }).then(res => res).then((result) => {
            this.setState({news: result.data.data.news})
        })
    }

    render() {
        const createNewsUrl = '/news/new';
        const { news } = this.state;
        return (
            <div className="App">
                <AppBar>
                    <Toolbar>
                        <Button component={Link} to={createNewsUrl} size="large" color="inherit">
                            Create News</Button>
                    </Toolbar>
                </AppBar>
                <div className=" ">
                    <h1>NEWS</h1>
                    {news.map(member =>
                        <tr key={member.id}>
                            <Link to={`/news/${member.id}`}>{member.name}</Link>
                        </tr>
                    )}
                </div>
            </div>
        )
    }
}

