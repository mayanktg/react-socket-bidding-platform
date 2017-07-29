import React, { Component, PropTypes } from 'react';
import Moment from 'react-moment';

export default class BidSubmitModal extends Component {
  static propTypes = {
    isOpen: PropTypes.boolean,
    bid: PropTypes.object,
    onSubmitBidData: PropTypes.func,
    onClose: PropTypes.func
  }
  constructor(props) {
    super(props);
  
    this.state = {
      bid_amount: 0
    };
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    this.props.onSubmitBidData(this.props.bid, this.state.bid_amount);
    event.preventDefault();
  }

  render() {
    const isOpen = this.props.isOpen;
    const bid = this.props.bid;
    return (
      <div>
        {
          isOpen &&
          <div className="bid-modal">
            <div className="bid-modal-content">
              <div className="bid-modal-header">
                <h5>Participate in auction by bidding in it</h5>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div className="bid-modal-body">
                  <div className="form-group col-lg-12">
                    Bid Description:
                    <label>{bid.bid_desc}</label>
                  </div>
                  <div className="form-group col-lg-12">
                    Bid Items:
                    <label>{bid.bid_items.join(', ')}</label>
                  </div>
                  <div className="form-group col-lg-12">
                    Bid Start Date: 
                    <label>
                      {bid.start_date ? <Moment format="MMMM Do YYYY, h:mm a">{bid.start_date}</Moment> : 'NA' }
                    </label>
                  </div>
                  <div className="form-group col-lg-12">
                    Bid End Date:
                    <label>
                      {bid.end_date ? <Moment format="MMMM Do YYYY, h:mm a">{bid.end_date}</Moment> : 'NA' }
                    </label>
                  </div>

                  <div className="form-group col-lg-12">
                    <label>Enter Bid Amount: </label>
                    <input type="number"
                           min="1"
                           name="bid_amount"
                           className="form-control"
                           value={this.state.bid_amount}
                           onChange={this.handleInputChange.bind(this)}
                           required />
                  </div>
                </div>
                <div className="bid-modal-footer">
                  <div className="form-group col-lg-12">
                    <div className="col-lg-3 pull-right">
                      <button name="close"
                              onClick={() => {this.props.onClose();}}
                              className="form-control btn btn-default">Close</button>
                    </div>
                    <div className="col-lg-3 pull-right">
                      <button type="submit"
                              name="submit"
                              className="form-control btn btn-primary">Submit</button>
                    </div>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
      </div>
      
        
    );
  }
}
