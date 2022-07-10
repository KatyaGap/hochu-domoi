import { combineReducers } from 'redux';
import advertsReducer from './adverts';
import filterReducer from './filter';
import fiveFoundReducer from './fiveFound';
import fiveLostReducer from './fiveLost';
import foundReducer from './found';
import lostReducer from './lost';
import mapReducer from './map';

const rootReducer = combineReducers({
  adverts: advertsReducer,
  fivelosts: fiveLostReducer,
  fivefounds: fiveFoundReducer,
  found: foundReducer,
  lost: mapReducer,
  filtered: filterReducer,
});
export default rootReducer;
