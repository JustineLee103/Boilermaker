import React from 'react'
import {Route, Switch } from 'react-router-dom'
//import other components and add to the routes as component={}
import Puppies from './Puppies'

const Root = () => {
    return (
        <div>
            <main>
                <Switch>
                 <Route exact path="/puppies" component={Puppies} />
                 </Switch>
            </main>
        </div>
    )
}

export default Root
