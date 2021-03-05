const initialStates = {
  comments: [],
  commentsOnArtwork: [],
  myComments: [],
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
    case "GET_MY_COMMENTS":
      return {
        ...state,
        myComments: action.payload
      };
    case "DELETE_COMMENT":
      let indexOfElemToDelete = state.comments.map(e => e.id_feedback).indexOf(action.payload);
      return {
        ...state,
        comments: [
          ...state.comments.slice(0, indexOfElemToDelete),
          ...state.comments.slice(
            indexOfElemToDelete + 1,
            state.comments.length
          ),
        ],
      };
    case "UPDATE_COMMENT":
      let indexOfElemToEdit = state.comments.map(e => e.id_feedback).indexOf(action.payload.id_feedback);
      return {
        ...state,
        comments: [
          ...state.comments.slice(0, indexOfElemToEdit),
          action.payload,
          ...state.comments.slice(
            indexOfElemToEdit + 1,
            state.comments.length
          ),
        ],
      };
    default:
      return {
        ...state,
      };
  }
};

export default commentsReducer;