import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Home from './Home'

import Login from './components/Users/Login'
import Register from './components/Users/Register'
import Account from './components/Users/Account'

import Listing from './components/Posts/Listing'
import Show from './components/Posts/Show'
import Add from './components/Posts/Add'

function App() {
    const handleLogout = () => {
        localStorage.removeItem('authPostToken')
        window.location.reload()
    }
    return (
        <div className="container">
            <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Posts App</span>
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                           localStorage.getItem('authPostToken') ? (
                                <React.Fragment> 
                                    
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    
                
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/posts">Posts</Link> 
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link float-right" to="/account"> Account </Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link float-right" to="#" onClick={handleLogout}> Logout </Link>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/"><Link to="/"> Home </Link> </a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/"><Link to="/login"> Login </Link>  </a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/"><Link to="/register"> Register </Link>  </a>
                                    </li>
                                    
                                </React.Fragment>
                            )
                        }            
                    </ul>
                </div>
            </nav>

            <Switch>

            <Route path="/" component={Home} exact={true} />

            <Route path="/login" component={Login} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/account" component={Account} exact={true} />

            <Route path="/posts" component={Listing} exact={true}/>
            <Route path="/posts/add" component={Add} exact={true} />
            <Route path="/posts/:id" component={Show} />
            </Switch>

            </BrowserRouter>
        </div>
    )
}

export default App