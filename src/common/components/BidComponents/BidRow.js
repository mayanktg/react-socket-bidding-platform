import React, { Component, PropTypes } from 'react';
import Moment from 'react-moment';
import momentjs from 'moment';
import { putInviteBid } from '../../actions/bidActions';

export default class BidRow extends Component {
  static propTypes = {
    bid: PropTypes.object.isRequired,
    keyName: PropTypes.string.isRequired,
    user: PropTypes.object,
    socket: PropTypes.object.isRequired,
    onOpenSubmitModal: PropTypes.func
  }

  invite = () => {
    const { socket, bid } = this.props;
    const user = prompt('Please enter the user id of person', '');
    if (user) {
      putInviteBid(this.props.bid._id, user);
      socket.emit('user invited to bid', { username: user, bid: bid });
    }
  }

  submitBid = () => {
    this.props.onOpenSubmitModal(this.props.bid);
  }
  render() {
    const bid = this.props.bid;
    return (
      <div key={this.props.keyName}
           className="bidRow row">
        <div className="col-lg-2">{bid.bid_desc || '_NA_'}</div>
        <div className="col-lg-3">
          <ul>
            {
              bid.bid_items && bid.bid_items.map((item) => {
                return (<li>{item}</li>);
              })
            }
          </ul>
        </div>
        <div className="col-lg-2">
          Starts at: <br/>
           {bid.start_date ? <Moment format="MMMM Do YYYY, h:mm a">{bid.start_date}</Moment> : 'yet to start' }
        </div>
        <div className="col-lg-2">
          Ends at: <br/>
           {bid.end_date ? <Moment format="MMMM Do YYYY, h:mm a">{bid.end_date}</Moment> : '_NA_' }
        </div>
        {
          this.props.user.username === bid.created_by &&
          <div className="col-lg-1">
            <a className="btn btn-sm btn-primary pull-right" href={`/bid/view/${bid._id}`}>View</a>
          </div>
        }
        {
          this.props.user.username === bid.created_by &&
          <div className="col-lg-1">
            <a className="btn btn-sm btn-success pull-right"
               onClick={this.invite}>
              Invite
            </a>
          </div>
        }
        {
          bid.invited_bidders.indexOf(this.props.user.username) !== -1 &&
          (momentjs().isAfter(bid.start_date) && momentjs().isBefore(bid.end_date)) &&
          <div className="col-lg-1">
            <a className="btn btn-sm btn-info pull-right"
               onClick={() => {this.submitBid();}}>
              Bid
            </a>
          </div>
        }
      </div>
    );
  }
}
