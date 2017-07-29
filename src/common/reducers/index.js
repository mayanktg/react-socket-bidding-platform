import auth from './auth';
import userValidation from './userValidation';
import bid from './bid';
import environment from './environment';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  bid,
  auth,
  userValidation,
  environment,
  formReducer
});

export default rootReducer;
