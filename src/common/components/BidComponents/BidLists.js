import React, { Component, PropTypes } from 'react';
import BidRow from './BidRow';
export default class BidLists extends Component {
  static propTypes = {
    bids: PropTypes.array.isRequired,
    user: PropTypes.object,
    socket: PropTypes.object.isRequired,
    onOpenSubmitModal: PropTypes.func
  }
  render() {
    return (
      <div className="bidLists col-lg-12">
        {
          this.props.bids.map((bid, index) => {
            return (
              <BidRow bid={bid}
                      keyName={bid._id}
                      key={bid._id}
                      user={this.props.user}
                      socket={this.props.socket}
                      onOpenSubmitModal={this.props.onOpenSubmitModal} />
            );
          })
        }
        {
          !this.props.bids &&
            <div>No bids found</div>
        }
      </div>
    );
  }
}
