import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class Show extends React.Component {
    constructor() {
        super()
        this.state = {
            post: {},
            score: '',
            comment: ''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/posts/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authPostToken')
            }
        })
            .then(response => {
                const post = response.data
                // console.log(post)
                this.setState({post})
            })
            .catch(err => alert(err))
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleSubmit = (e) => {
        // alert(e.target.name)
        const id = this.props.match.params.id
        const body = {}
        if(e.target.name == 'score') {
            body.rating = this.state.score
        } else {
            body.comment = this.state.comment
        }
        axios.put(`/posts/${id}`, body, {
            headers: {
                'x-auth': localStorage.getItem('authPostToken')
            }
        })
            .then(res => {
                return axios.get(`/posts/${id}`, {
                    headers: {
                        'x-auth': localStorage.getItem('authPostToken')
                    }
                })
            })
            .then(res => {
                const post = res.data
                this.setState({post, comment: '', score: ''})
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Post</h2>
                <br />
                <Link to="add">Add a post</Link>
                {Object.keys(this.state.post) != 0 && 
                    <div className="row" key={this.state.post._id} style={{height: '150px'}}>
                        <div className="col-md-2"><img style={{maxWidth: "100px", maxHeight: "100px", padding: "10px"}} alt="thumbnail" src={this.state.post.image ? `http://localhost:3020/${this.state.post.image}` : ""} /></div>
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-10"></div>
                                <div className="col-md-2">{this.state.post.date.slice(0,10)}</div>
                            </div>
                            <div className="row">
                            <div className="col-md-12"><Link to={`/posts/${this.state.post._id}`}>Title</Link> - {this.state.post.title}</div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">Author - {this.state.post.user.userName}</div>
                                <div className="col-md-3">Scores - {this.state.post.score.length} <input type="text" value={this.state.score} placeholder="Add Rating" name="score" onChange={this.handleChange} /><button name="score" onClick={this.handleSubmit}>Submit</button></div>
                                <div className="col-md-3"><Link to={`/posts/${this.state.post._id}`}>Comments</Link> - {this.state.post.comments.length} <input type="text" placeholder="Add Comment" value={this.state.comment} name="comment" onChange={this.handleChange} /><button name="comment" onClick={this.handleSubmit}>Submit</button></div>
                            </div>
                        </div>
                    </div>
                }
                {
                    this.state.post.comments  && (this.state.post.comments.length == 0 ? <p> No comment found</p> : (
                        this.state.post.comments.map(comment => {
                            return <li key={comment._id}>{comment.comment} - {comment.user.userName}</li>
                        })
                    ))
                }
            </div>
        )
    }
}

export default Show