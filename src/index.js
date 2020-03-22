import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router} from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import NewNews from "./NewNews";
import NewsInfo from "./NewsInfo";
import UpdateNews from "./UpdateNews";

const Main = () => (
    <Switch>
        <Route exact path="/" component={App} />
        <Route exact path='/news/new' component={NewNews} />
        <Route exact path='/news/:id' component={NewsInfo} />
        <Route exact path='/news/:id/edit' component={UpdateNews} />
    </Switch>
);



ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Main />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
