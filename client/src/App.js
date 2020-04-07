import React from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Home from './Home'
import Listing from './components/Listing'

function App() {
    return (
        <div>
            <BrowserRouter>
                <h1>Posts App</h1>

                <Link to="/">home</Link>
                <Link to="/posts">posts</Link>

                <Route path="/" component={Home} exact={true} />
                <Route path="/posts" component={Listing} />
            </BrowserRouter>
        </div>
    )
}

export default App