import React from 'react'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

class Account extends React.Component {
    constructor() {
        super()
        this.state = {
            account: {}
        }
    }
    componentDidMount() {
        axios.get('/users/account', {
            headers: {
                'x-auth': localStorage.getItem('authPostToken')
            }
        })
            .then(res => {
                const account = res.data
                this.setState({account})
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Please enter valid values',
                    text: err,
                })
            })
    }
    render() {
        return (
            <div>
                <br />
                <h2 style={{textAlign: 'center'}}> User Info </h2>

                <br />
                <h4>Username - {this.state.account.userName}</h4>
                <h4>Email - {this.state.account.email}</h4>
                
            </div>
        )
    }
}

export default Account