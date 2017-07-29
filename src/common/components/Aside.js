import React from 'react';
import { Link } from 'react-router';

export default class Aside extends React.Component {
  render() {
    return (
      <div className="aside">
        <Link to="/bid/home">
          <button className="aside-button">Dashboard</button>
        </Link>
        <Link to="/bid/create">
          <button className="aside-button">Create New Bid</button>
        </Link>
      </div>
    );
  }
}
