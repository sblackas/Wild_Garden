const initialStates = {
    comments: [],
    commentsOnArtwork: [],
    id: ""
    
 };

 const commentsReducer = (state = initialStates, action) => {
    switch (action.type) {
      case "GET_ALL_COMMENTS":
        return {
          ...state,
          comments: action.payload
        };
        case "ADD_COMMENT":
        return {
          ...state,
          comments: [...state.comments, 
            {
              ...action.payload,
              id: action.id
            }]
        };
        case "GET_ARTWORK_COMMENTS":
        return {
          ...state,
          commentsOnArtwork: action.payload
        };
   
      default:
        return {
          ...state,
        };
    }
  };
  
  export default commentsReducer;