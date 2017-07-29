import React, { Component, PropTypes } from 'react';
import BidRow from './BidRow';
import BidLists from './BidLists';
import BidSubmitModal from './BidSubmitModal';
import { putSubmitBid } from '../../actions/bidActions';


export default class BidHome extends Component {
  static propTypes = {
    activeBids: PropTypes.array,
    inactiveBids: PropTypes.array,
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    socket: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmitBidData = (bid, amount) => {
    console.log(bid, amount);
    const { dispatch, user } = this.props;
    dispatch(putSubmitBid(bid._id, user.username, amount));
    this.onCloseSubmitBid();
    alert('bid submitted');
  }

  onCloseSubmitBid = () => {
    this.setState({ received_bid: null, showBidSubmitModal: false });
  }

  onOpenSubmitModal = (bid) => {
    this.setState({ received_bid: bid, showBidSubmitModal: true });
  }

  componentDidMount() {
    const { socket, user, dispatch } = this.props;
    socket.emit('sdsad mounted', user);
    socket.on('new bid invitation', data => {
      console.log(data, user);
      if (user.username === data.username) {
        this.onOpenSubmitModal(data.bid);
      }
    });
  }
  render() {
    return (
      <div className="bidComponent">
        <div className="bidSection">
          <h3>Active Invited Bids</h3>
          <BidLists bids={this.props.activeBids}
                    user={this.props.user}
                    socket={this.props.socket}
                    onOpenSubmitModal={this.onOpenSubmitModal} /> 
        </div>
        <div className="bidSection">
          <h3>Inactive Invited Bids</h3>
          <BidLists bids={this.props.inactiveBids}
                    user={this.props.user}
                    onOpenSubmitModal={this.onOpenSubmitModal} /> 
        </div>
        {
          this.state.showBidSubmitModal &&
            <BidSubmitModal isOpen={this.state.showBidSubmitModal}
                            bid={this.state.received_bid}
                            onSubmitBidData={this.onSubmitBidData}
                            onClose={this.onCloseSubmitBid} />
        }
      </div>
    );
  }
}
