import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Header extends Component {
  state = {
    displayMenuItem: 'no-display-mobile-menu',
  }

  onClickMenu = () => {
    this.setState({displayMenuItem: 'display-mobile-menu'})
  }

  onCloseMenu = () => {
    this.setState({displayMenuItem: 'no-display-mobile-menu'})
  }

  render() {
    const {displayMenuItem} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-content-large-container">
          <Link to="/" className="web-site-logo-container">
            <h1 className="decease-country-name-container">
              STUDENT<span className="country-name-container">DASHBOARD</span>
            </h1>
          </Link>
          <ul className="nav-menu-large-container">
            <li className="nav-link-large-container">
              <Link to="/" className="nav-link-item-large-container">
                <button type="button" className="header-buttons">
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-link-large-container">
              <Link to="/students" className="nav-link-item-large-container">
                <button type="button" className="header-buttons">
                  Add Student
                </button>
              </Link>
            </li>
            <li className="mobile-menu-button-list">
              <button
                type="button"
                className="mobile-menu-button"
                onClick={this.onClickMenu}
              >
                <img
                  className="mobile-menu-button-image"
                  src="https://res.cloudinary.com/dhq6fmhci/image/upload/v1674144976/add-to-queue_1_hqwpt7.png"
                  alt="menu"
                />
              </button>
            </li>
          </ul>
        </div>
        <div className={`nav-content-mobile-container ${displayMenuItem}`}>
          <div className="nav-menu-mobile-and-close-container">
            <ul className="nav-menu-mobile-container">
              <li className="nav-link-mobile-container">
                <Link to="/" className="nav-link-item-mobile-container">
                  <button type="button" className="header-buttons">
                    Home
                  </button>
                </Link>
              </li>
              <li className="nav-link-mobile-container">
                <Link to="/students" className="nav-link-item-mobile-container">
                  <button type="button" className="header-buttons">
                    Add Student
                  </button>
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="mobile-menu-close-button"
              onClick={this.onCloseMenu}
            >
              <img
                className="mobile-menu-close-button-image"
                src="https://res.cloudinary.com/dhq6fmhci/image/upload/v1674146415/Solid_vjuwhy.png"
                alt="close"
              />
            </button>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header