import { combineReducers } from 'redux';
import userReducer from './features/userSlice';

const rootReducer = combineReducers({
    account: userReducer,
});

export default rootReducer;
