import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Button} from 'react-bootstrap'
import './index.css'

class NavBar extends Component {
  logOut = () => {
    const {history} = this.props
    Cookies.remove('sessionToken')
    history.push('/login')
  }

  render() {
    return (
      <div className="navbar">
        <div>
          <img
            className="logo-nav"
            src="https://res.cloudinary.com/pvsaiganesh/image/upload/v1623875529/Group_7399_xeljqs.png"
            alt="logo"
          />
        </div>
        <Button onClick={this.logOut} variant="danger">
          LogOut
        </Button>
      </div>
    )
  }
}
export default withRouter(NavBar)
