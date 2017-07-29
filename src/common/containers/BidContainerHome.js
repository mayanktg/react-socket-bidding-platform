import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/bidActions';
import {receiveAuth} from '../actions/authActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Aside from '../components/Aside';
import BidHome from '../components/BidComponents/BidHome';

const socket = io('');

class BidContainerHome extends Component {
  componentDidMount() {
    const { dispatch, user, activeBids, inactiveBids, socket } = this.props;
    if(!user.username) {
      dispatch(receiveAuth());
    }
    dispatch(actions.getActiveBids());
    dispatch(actions.getInactiveBids());
  }

  onSubmitBid = (bid_id, user_id, amount) => {
    const { dispatch } = this.props;
    dispatch(actions.putSubmitBid(bid_id, user_id, amount));
  }  


  render() {
    const activeBids = this.props.activeBids || [];
    const inactiveBids = this.props.inactiveBids || [];
    return (
      <div className="bidContainer">
        <Aside />
        <BidHome activeBids={activeBids.bids ? activeBids.bids : []}
                 inactiveBids={inactiveBids.bids ? inactiveBids.bids : []}
                 user={this.props.user}
                 socket={socket}
                 dispatch={this.props.dispatch} />
      </div>
    );
  }
}
BidContainerHome.propTypes = {
  user: PropTypes.object.isRequired,
  activeBids: PropTypes.object,
  inactiveBids: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
      user: state.auth.user,
      activeBids: state.bid.activeBids,
      inactiveBids: state.bid.inactiveBids
  }
}
export default connect(mapStateToProps)(BidContainerHome)
