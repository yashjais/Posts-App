import React from 'react'
import axios from '../config/axios'

class Listing extends React.Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        axios.get('/posts')
            .then(res => console.log(res.data))
            .catch(err => alert(err))
    }
    render() {
        return(
            <h1>hello</h1>
        )
    }
}

export default Listing