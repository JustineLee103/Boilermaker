import '../public/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import store from './store'
import Root from './components/root'

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <div>Hello, world! This works!yes?yes!</div>
            <Root />
        </Provider>
    </HashRouter>,
    document.getElementById('app')
)