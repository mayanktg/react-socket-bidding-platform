import React from 'react';

export default class Navbar extends React.Component {
  handleSignOut = () => {
    const { dispatch } = this.props;
    dispatch(signOut());
  }

  render() {
    return (
      <nav className="navbar-item">
        <div>
          Bidding Platform
        </div>
      </nav>
    );
  }
}
