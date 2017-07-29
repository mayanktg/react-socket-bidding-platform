import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { postCreateBid, putSaveBid } from '../../actions/bidActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import moment from 'moment';
import cookie from 'react-cookie';

@connect(
    state => ({
      bid: state.bid }),
    dispatch => bindActionCreators({ postCreateBid, putSaveBid }, dispatch))
export default class BidView extends Component {
  static propTypes = {
    isCreate: PropTypes.boolean,
    postCreateBid: PropTypes.func,
    putSaveBid: PropTypes.func,
    bidData: PropTypes.object,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      created_by: this.props.user.username
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bidData) {
      const bid = nextProps.bidData || {}; 
      this.setState({
        created_by: cookie.load('username'),
        bid_desc: bid.bid_desc,
        bid_items: (bid.bid_items ? bid.bid_items.join(',') : ''),
        min_bid_value: bid.min_bid_value || 0,
        max_bid_count: bid.max_bid_count,
        start_date: bid.start_date ? moment(bid.start_date).format('YYYY-MM-DDThh:mm') : moment(),
        end_date: bid.end_date ? moment(bid.end_date).format('YYYY-MM-DDThh:mm') : moment(),
        is_active: bid.is_active
      });
    }
  }

  convertToArray = (str) => {
    return str.split(',');
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (name === 'bid_items') {
      value = this.convertToArray(value);
      value = value.split(',');
      console.log(value);
    }
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    console.log(this.state);
    let bid = this.state;
    bid.bid_items = this.convertToArray(this.state.bid_items);

    // this.props.dispatch(postCreateBid())
    if (this.props.isCreate) {
      postCreateBid(bid);
      const result = window.confirm('Bid successfully created, DO you want to go to home page?');
      if (result) browserHistory.push('/bid/home')
    } else {
      putSaveBid(bid, this.props.bidData._id);
      alert('successfully saved');
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="bidComponent">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group col-lg-12">
            <label>Description: </label>
            <input type="text"
                   name="bid_desc"
                   className="form-control"
                   value={this.state.bid_desc}
                   onChange={this.handleInputChange}
                   required />
          </div>
          <div className="form-group col-lg-12">
            <label>Items: </label>
            <input type="text"
                   name="bid_items"
                   className="form-control"
                   value={this.state.bid_items}
                   onChange={this.handleInputChange}
                   required />
          </div>
          <div className="form-group col-lg-2">
            <label>Min bid value: </label>
            <input type="number"
                   min={0}
                   name="min_bid_value"
                   className="form-control"
                   value={this.state.min_bid_value}
                   onChange={this.handleInputChange}
                   required />
          </div>
          <div className="form-group col-lg-2">
            <label>Max bidding allowed: </label>
            <input type="number"
                   min={0}
                   name="max_bid_count"
                   className="form-control"
                   value={this.state.max_bid_count}
                   onChange={this.handleInputChange}
                   required />
          </div>
          <div className="form-group col-lg-3">
            <label>Start date: </label>
            <input type="datetime-local"
                   name="start_date"
                   className="form-control"
                   value={this.state.start_date}
                   onChange={this.handleInputChange}
                   required />
          </div>
          <div className="form-group col-lg-3">
            <label>End date: </label>
            <input type="datetime-local"
                   name="end_date"
                   className="form-control"
                   value={this.state.end_date}
                   onChange={this.handleInputChange}
                   required />
          </div>
          <div className="form-group col-lg-2">
            <label>Make bid live: </label>
            <input type="checkbox"
                   name="is_active"
                   className="form-control"
                   value={this.state.is_active}
                   checked={this.state.is_active}
                   onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-lg-3">
            <button type="submit"
                    name="submit"
                    className="form-control btn btn-primary" >Submit Changes</button>
          </div>
        </form>

        { 
          this.props.bidData && this.props.bidData.transactions &&
          <div className="col-lg-12">
            <h3>Transaction History</h3>
            <table className="col-lg-12">
              <tr>
                <th className="col-lg-2">Username</th>
                <th className="col-lg-2">Status</th>
                <th className="col-lg-2">Bid Amount</th>
                <th className="col-lg-2">Created at</th>
              </tr>
              {
                this.props.bidData.transactions.map((transaction, index) => {
                  return(
                    <tr key={index}>
                      <td>{transaction.user_id}</td>
                      <td>{transaction.status}</td>
                      <td>Rs. {transaction.bid_amount ? `Rs. ${transaction.bid_amount}` : 'NA'}</td>
                      <td>{moment(transaction.created_at).format('MMMM Do YYYY, h:mm a')}</td>
                    </tr>
                  );
                })
              }
            </table>
          </div>
          
          
        }
      </div>
    );
  }
}
