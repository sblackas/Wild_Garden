const initialStates = {
    artworks: [],
    id: String
 };

 const artworksReducer = (state = initialStates, action) => {
    switch (action.type) {
      case "GET_ARTWORKS":
        return {
          ...state,
          artworks: action.payload,          
        };
        case "ADD_PRODUCTS":
        return {
          ...state,
          artworks: [...state.artworks, 
            {
              ...action.payload,
              id: action.id
            }]
        };
        case "DELETE_ARTWORK":
      let indexOfElemToDelete  = state.artworks.map(e => e.id_artwork).indexOf(action.payload);
      return {
        ...state,
              artwworks: [
                ...state.artworks.slice(0, indexOfElemToDelete),
                ...state.artworks.slice(
                  indexOfElemToDelete + 1,
                  state.artworks.length
                ),
              ],
            };

   
      default:
        return {
          ...state,
        };
    }
  };
  
  export default artworksReducer;