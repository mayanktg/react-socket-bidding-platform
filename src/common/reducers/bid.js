import { LOAD_ACTIVE_BIDS, LOAD_ACTIVE_BIDS_SUCCESS, LOAD_ACTIVE_BIDS_FAIL,
         LOAD_INACTIVE_BIDS, LOAD_INACTIVE_BIDS_SUCCESS, LOAD_INACTIVE_BIDS_FAIL,
         POST_NEW_BID, POST_NEW_BID_SUCCESS, POST_NEW_BID_FAIL,
         GET_BID, GET_BID_SUCCESS, GET_BID_FAIL,
         PUT_SAVE_BID, PUT_SAVE_BID_SUCCESS,
         PUT_INVITE_BID, PUT_INVITE_BID_SUCCESS,
         PUT_SUBMIT_BID, PUT_SUBMIT_BID_SUCCESS, PUT_SUBMIT_BID_FAIL }
  from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  activeBids: [],
  inactiveBids: []
};

export default function bid(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVE_BIDS:
      return { ...state,
        loading: true
      };
    case LOAD_ACTIVE_BIDS_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        activeBids: action.bids
      };
    case LOAD_ACTIVE_BIDS_FAIL:
      return { ...state,
        loading: false,
        loaded: false,
        error: action.error,
        activeBids: []
      };
    case LOAD_INACTIVE_BIDS:
      return { ...state,
        loading: true
      };
    case LOAD_INACTIVE_BIDS_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        inactiveBids: action.bids
      };
    case LOAD_INACTIVE_BIDS_FAIL:
      return { ...state,
        loading: false,
        loaded: false,
        error: action.error,
        inactiveBids: []
      };

    case POST_NEW_BID:
      return { ...state,
        loading: true
      };
    case POST_NEW_BID_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        success: true
      };
    case POST_NEW_BID_FAIL:
      return { ...state,
        loading: false,
        loaded: false,
        error: action.error,
        success: false
      };

    case GET_BID:
      return { ...state,
        loading: true
      };
    case GET_BID_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        bid: action.bid
      };
    case GET_BID_FAIL:
      return { ...state,
        loading: false,
        loaded: false,
        error: action.error,
        bid: action.bid
      };

    case PUT_SAVE_BID:
      return { ...state,
        loading: true
      };
    case PUT_SAVE_BID_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        success: true
      };

    case PUT_INVITE_BID:
      return { ...state,
        loading: true
      };
    case PUT_INVITE_BID_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        success: true
      };

    case PUT_SUBMIT_BID:
      return { ...state,
        loading: true
      };
    case PUT_SUBMIT_BID_SUCCESS:
      return { ...state,
        loading: false,
        loaded: true,
        success: true
      };
    case PUT_SUBMIT_BID_FAIL:
      return { ...state,
        loading: false,
        loaded: false,
        error: action.error
      };

    default:
      return state;
  }
}
