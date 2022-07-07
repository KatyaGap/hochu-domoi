import { combineReducers } from "redux";
import advertsReducer from "./adverts";
import fiveFoundReducer from "./fiveFound";
import fiveLostReducer from "./fiveLost";
import foundReducer from "./found";
import lostReducer from "./lost";

const rootReducer = combineReducers({ adverts: advertsReducer, fivelosts: fiveLostReducer, fivefounds: fiveFoundReducer, founds: foundReducer, losts: lostReducer});
export default rootReducer;
