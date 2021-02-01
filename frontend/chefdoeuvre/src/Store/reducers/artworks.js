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
   
      default:
        return {
          ...state,
        };
    }
  };
  
  export default artworksReducer;