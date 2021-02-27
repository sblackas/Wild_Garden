const initialStates = {
    categories: [],
    id: ""
    
 };

 const cateReducer = (state = initialStates, action) => {
    switch (action.type) {
      case "GET_CATEGORIES":
        return {
          ...state,
          categories: action.payload
        };
        case "ADD_CATEGORY":
        return {
          ...state,
          categories: [...state.categories, 
            {
              ...action.payload,
              id: action.id
            }]
        };
        case "EDIT_CATEGORY":
          let indexOfElemToEdit  = state.categories.map(e => e.id_cate).indexOf(action.payload.id_cate);
         return {
          ...state,
                categorie : [
                    ...state.categories.slice(0, indexOfElemToEdit),
                   action.payload,
                    ...state.categories.slice(
                      indexOfElemToEdit + 1,
                      state.categories.length
                    ),
                  ],
         };
         case "DELETE_CATEGORY":
          let indexOfElemToDelete  = state.categories.map(e => e.id_cate).indexOf(action.payload);
          return {
            ...state,
            categories: [
                    ...state.categories.slice(0, indexOfElemToDelete),
                    ...state.categories.slice(
                      indexOfElemToDelete + 1,
                      state.categories.length
                    ),
                  ],
                };
      default:
        return {
          ...state,
        };
    }
  };
  
  export default cateReducer;