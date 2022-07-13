import { combineReducers } from 'redux';
import advertsReducer from './adverts';
import filterReducer from './filter';
import fiveFoundReducer from './fiveFound';
import fiveLostReducer from './fiveLost';
import foundReducer from './found';
import likeReducer from './like';
import lostReducer from './lost';
import mapReducer from './map';
import paramsReducer from './params';
import profileReducer from './profile';

const rootReducer = combineReducers({
  adverts: advertsReducer,
  fivelosts: fiveLostReducer,
  fivefounds: fiveFoundReducer,
  found: foundReducer,
  lost: lostReducer,
  filtered: filterReducer,
  params: paramsReducer,
  profile: profileReducer,
	likes: likeReducer,
});
export default rootReducer;
