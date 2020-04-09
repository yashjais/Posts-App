import React from 'react'
import axios from '../../config/axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

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
                // console.log(posts)
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
                <div className="container">
                    {
                        this.state.posts.map(post => {
                            return (
                                <div className="row" key={post._id} style={{height: '150px'}}>
                                    <div className="col-md-2"><img style={{maxWidth: "100px", maxHeight: "100px", padding: "10px"}} alt="thumbnail" src={post.image ? `http://localhost:3020/${post.image}` : ""} /></div>
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-10"></div>
                                            <div className="col-md-2">{post.date.slice(0,10)}</div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-12"><Link to={`/posts/${post._id}`}>Title</Link> - {post.title}</div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">Author - {post.user.userName}</div>
                                            <div className="col-md-3">Scores - {post.score.length}</div>
                                            <div className="col-md-3"><Link to={`/posts/${post._id}`}>Comments</Link> - {post.comments.length}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Listing