import * as types from '../constants/ActionTypes';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

function activeBids(bids) {
  return {
    type: types.LOAD_ACTIVE_BIDS_SUCCESS,
    bids
  };
}

function inactiveBids(bids) {
  return {
    type: types.LOAD_INACTIVE_BIDS_SUCCESS,
    bids
  };
}

function createBid(data) {
  return {
    type: types.POST_NEW_BID_SUCCESS,
    data
  };
}

function saveBid(data) {
  return {
    type: types.PUT_SAVE_BID_SUCCESS,
    data
  };
}

function inviteBid(data) {
  return {
    type: types.PUT_INVITE_BID_SUCCESS,
    data
  };
}

function submitBid(data) {
  return {
    type: types.PUT_SUBMIT_BID_SUCCESS,
    data
  };
}

function submitBidFail(err) {
  return {
    type: types.PUT_SUBMIT_BID_FAIL,
    err
  };
}

function bidDetails(bid) {
  return {
    type: types.GET_BID_SUCCESS,
    bid
  };
}

export function getActiveBids() {
  return dispatch => {
    return fetch('/api/bid/activebids')
      .then((data) => data.json())
      .then((json) => dispatch(activeBids(json)))
      .catch(error => {throw error});
  }
}

export function getInactiveBids() {
  return dispatch => {
    return fetch('/api/bid/inactivebids')
      .then((data) => data.json())
      .then((json) => dispatch(inactiveBids(json)))
      .catch(error => {throw error});
  }
}

export function postCreateBid(bid) {
  return fetch('/api/bid/create', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bid)
  })
    .then((data) => createBid(data))
    .catch(error => {throw error});
}

export function putSaveBid(bid, id) {
  return fetch(`/api/bid/update/${id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bid)
  })
    .then((data) => createBid(data))
    .catch(error => {throw error});
}

export function putInviteBid(bid_id, user_id) {
  return fetch(`/api/bid/invite/${bid_id}/${user_id}`, {
    method: 'put'
  })
    .then((data) => inviteBid(data))
    .catch(error => {throw error});
}

export function putSubmitBid(bid_id, user_id, amount) {
  return dispatch => {
    return fetch(`/api/bid/submitbid/${bid_id}/${user_id}/${amount}`, {
      method: 'put'
    })
      .then((data) => dispatch(submitBid(data)))
      .catch(error => {dispatch(submitBidFail(error))});
  }
}

export function getBidDetails(id) {
  return dispatch => {
    return fetch(`/api/bid/find/${id}`)
      .then((data) => data.json())
      .then((json) => dispatch(bidDetails(json)))
      .catch(error => {throw error});
  }
}
