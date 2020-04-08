import React from 'react'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class Listing extends React.Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        axios.get('/posts', {
            headers: {
                'x-auth': localStorage.getItem('authPostToken')
            }
        })
            .then(res => {
                const posts = res.data
                console.log(posts)
                this.setState({posts})
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                })
                this.props.history.push('/')
            })
    }
    render() {
        return(
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Posts</h2>
                <br />
                {
                    this.state.posts.map(post => {
                        return <li key={post._id}>{post.title}</li>
                    })
                }
            </div>
        )
    }
}

export default Listing