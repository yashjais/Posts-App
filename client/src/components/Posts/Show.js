import React from 'react'
import axios from '../../config/axios'
import { Link } from 'react-router-dom'

class Show extends React.Component {
    constructor() {
        super()
        this.state = {
            post: {}
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
                this.setState({post})
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Post</h2>
                <br />
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
                                <div className="col-md-3">Scores - {this.state.post.score.length}</div>
                                <div className="col-md-3"><Link to={`/posts/${this.state.post._id}`}>Comments</Link> - {this.state.post.comments.length}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Show