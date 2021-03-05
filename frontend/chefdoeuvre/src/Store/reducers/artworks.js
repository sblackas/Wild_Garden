const initialStates = {
    artworks: [],
    myArtworks: [],
    myFavs: [],
    id: String
 };

 const artworksReducer = (state = initialStates, action) => {
    switch (action.type) {
      case "GET_ARTWORKS":
        return {
          ...state,
          artworks: action.payload,          
        };
        case "GET_MY_ARTWORKS":
        return {
          ...state,
          myArtworks: action.myArtworks

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
      let indexOfElemToDelete  = state.myArtworks.map(e => e.id_artwork).indexOf(action.payload);
      return {
        ...state,
        myArtworks: [
                ...state.myArtworks.slice(0, indexOfElemToDelete),
                ...state.myArtworks.slice(
                  indexOfElemToDelete + 1,
                  state.myArtworks.length
                ),
              ],
            };
            case "UPDATE_MY_ARTWORK":
              let indexOfElemToEdit  = state.myArtworks.map(e => e.id_product).indexOf(action.payload.id_artwork);
             return {
              ...state,
                    myArtworks : [
                        ...state.myArtworks.slice(0, indexOfElemToEdit),
                       action.payload,
                        ...state.myArtworks.slice(
                          indexOfElemToEdit + 1,
                          state.myArtworks.length
                        ),
                      ],
             };
             case "ADD_FAVORITES":
        return {
          ...state,
          myFavs: [...state.myFavs, 
            {
              ...action.payload,
              id: action.id
            }]
        };
        case "GET_MY_FAVS":
          return {
            ...state,
            myFavs: action.payload
  
          };
          case "DELETE_MY_FAV":
            let indexOfElemToDeleteFav  = state.myFavs.map(e => e.id_artwork).indexOf(action.payload);
            return {
              ...state,
              myFavs: [
                      ...state.myFavs.slice(0, indexOfElemToDeleteFav),
                      ...state.myFavs.slice(
                        indexOfElemToDeleteFav + 1,
                        state.myFavs.length
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