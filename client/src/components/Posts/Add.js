import React from 'react'
import axios from '../../config/axios'

class Add extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            myImage: {}
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleFileChange = (e) => {
        const myImage = e.target.files[0]
        // console.log(myImage)
        this.setState({myImage})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { title, myImage } = this.state;
        let formData = new FormData();
        // console.log()
  
        formData.append('title', title);
        formData.append('myImage', myImage);
        axios.post('/posts', formData, {
            headers: {
                'x-auth': localStorage.getItem('authPostToken')
            }
        })
            .then(res => {
                this.props.history.push('/posts')
                window.location.reload()
            })
            .catch(err => alert(err))
    }
    render() {
        return (
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}>Add a Post</h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" onChange={this.handleChange} type="text" placeholder="title" /> <br />
                    <input type="file" onChange={this.handleFileChange} /> 
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default Add