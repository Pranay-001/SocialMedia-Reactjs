import React, { Component } from 'react';
import { clearAuthState, login } from '../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }
    handelEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handelPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handelFormSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            this.props.dispatch(login(email, password));
        }

    }

    render() {
        // console.log("this",this.props);
        const { error, inProgress, isLoggedIn } = this.props.auth;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        if (isLoggedIn) {
            return <Redirect to={from} />
        }
        return (
            <form className="login-form">
                <div className="login-header">Log In</div>
                {error && <div className="alert error">{error}</div>}
                <div className="login-field">
                    <input type="email" onChange={this.handelEmailChange}
                        placeholder="Email"
                        value={this.state.email}
                        required />
                </div>
                <div className="login-field">
                    <input type="password" onChange={this.handelPasswordChange}
                        placeholder="Password"
                        value={this.state.password}
                        required />
                </div>
                <div className="login-field">
                    {inProgress
                        ? <button disabled={true} >Loggin in...</button>
                        : <button className="loginIn" onClick={this.handelFormSubmit}>Log In</button>
                    }
                </div>
            </form>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
        // dispatch:state
    };
}
export default connect(mapStateToProps)(Login);