import {combineReducers} from 'redux';
import artistReducer from './artist';
import artworksReducer from './artworks'


export default combineReducers(
     {
        artworksReducer,
        artistReducer
    }
)