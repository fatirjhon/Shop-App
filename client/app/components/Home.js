import React from 'react';
import List from './Item/List';

import {
  getFromStorage,
  setInStorage
} from '../utility/storage'

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
    }

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this. onSignOut.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('shop_app');
    if (obj && obj.token) {
      const {token} = obj;
      fetch('/api/account/verify?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onSignIn() {
    const {
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true
    });

    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('shop_app', {token: json.token});
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignOut() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage('shop_app');
    if (obj && obj.token) {
      const {token} = obj;
      fetch('/api/account/signout?token=' + token)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            token: '',
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }

    if (!token) {
      return (
        <div>
          <div>
            <form>
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              <p>Sign In</p>
              <hr className="lineHr"/>
              <label>Email :</label><br/>
              <input type="email" placeholder="Input email here" value={signInEmail} onChange={this.onTextboxChangeSignInEmail}/><br/>
              <label>Password :</label><br/>
              <input type="password" placeholder="Input password here" value={signInPassword} onChange={this.onTextboxChangeSignInPassword}/><br/>
              <button onClick={this.onSignIn}>Sign In</button>
            </form>
          </div>
        </div>
      );
    }

    return (
      <div>
        <List/>
        <br/>
        <br/>
        <br/>
        <button onClick={this.onSignOut}>Sign Out</button>
      </div>
    );
  }
}

export default Home;
