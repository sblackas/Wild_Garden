import {combineReducers} from 'redux';
import artistReducer from './artist';
import artworksReducer from './artworks'
import adminReducer from './admin'
import cateReducer from './categories'
import commentsReducer from './comments'


export default combineReducers(
     {
        artworksReducer,
        artistReducer,
        adminReducer,
        cateReducer,
        commentsReducer
    }
)