import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {user: '', pass: '', err: false, displayErr: ''}

  username = event => {
    this.setState({user: event.target.value})
  }

  password = event => {
    this.setState({pass: event.target.value})
  }

  validateUser = async () => {
    const {history} = this.props
    const {user, pass} = this.state
    const url = 'https://demo.credy.in/api/v1/usermodule/login/'
    const userDetails = {
      username: user,
      password: pass,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    if (responseData.is_success === true) {
      Cookies.set('sessionToken', responseData.data.token, {expires: 1})
      history.push('/')
    } else {
      this.setState({err: true, displayErr: responseData.error.message})
    }
  }

  render() {
    const {err, displayErr} = this.state
    return (
      <div className="bg">
        <img
          className="logo"
          src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623875529/Group_7399_xeljqs.png"
          alt="logo"
        />
        <div className="big-box">
          <div className="sign-in-box">
            <h1 className="heading">Sign in</h1>
            <div className="inputs">
              <div className="input-box">
                <label className="username-label" htmlFor="user">
                  USERNAME
                </label>
                <input
                  placeholder="Sai Ganesh"
                  id="user"
                  type="text"
                  className="input"
                  onChange={this.username}
                />
              </div>
              <div className="input-box">
                <label className="password-label" htmlFor="pass">
                  PASSWORD
                </label>
                <input
                  onChange={this.password}
                  id="pass"
                  type="password"
                  className="input"
                />
              </div>
              <p className="error">{err ? displayErr : ''}</p>
            </div>
            <button
              className="button"
              type="button"
              onClick={this.validateUser}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
