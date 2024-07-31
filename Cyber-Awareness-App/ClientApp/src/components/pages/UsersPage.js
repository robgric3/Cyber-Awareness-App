import React, { Component } from 'react';

export class UsersPage extends Component {
    static displayName = UsersPage.name;

    constructor(props) {
        super(props);
        this.state = { users: [] };
    }

    componentDidMount() {
        fetch('https://localhost:7190/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('Fetch success!');
                return response.json();
            })
            .then(data => this.setState({ users: data }))
            .catch(error => {
                console.log('Fetch failed: ', error);
            });

    }

    render() {
        return (
            <div>
                <h1>Users</h1>

                <p>This is a simple example of a React component that fetches data from an API.</p>

                {this.state.users.map(user => (
                    <div key={user.id}>
                        <h2>{user.firstName} {user.lastName}</h2>
                        <p>Email: {user.email}</p>
                        <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        );
    }
}
