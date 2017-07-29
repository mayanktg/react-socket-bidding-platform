import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/bidActions';
import {receiveAuth} from '../actions/authActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Aside from '../components/Aside';
import BidView from '../components/BidComponents/BidView';

class BidCreateContainer extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    bidDetails: PropTypes.object
  }

  constructor(props) {
    super(props);
  
    this.state = {
      bidData: {},
      isCreate: true
    };
  }
  componentDidMount() {
    const { dispatch, user, bidDetails } = this.props;
    if(!user.username) {
      dispatch(receiveAuth());
    }

    if (this.props.params.bid_id) {
      dispatch(actions.getBidDetails(this.props.params.bid_id));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.bidDetails && nextProps.bidDetails && nextProps.bidDetails.bid) {
      this.setState({
        isCreate: false,
        bidData: nextProps.bidDetails.bid
      });
    }
  }
  render() {
    const bidDetails = this.state.bidData || {};
    console.log(this.props.user);
    return (
      <div className="bidContainer">
        <Aside />
        <BidView isCreate={this.state.isCreate} bidData={bidDetails} user={this.props.user}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    bidDetails: state.bid.bid
  }
}
export default connect(mapStateToProps)(BidCreateContainer)
