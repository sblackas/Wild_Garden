const initialStates = {
    categories: [],
    id: String
    
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
   
      default:
        return {
          ...state,
        };
    }
  };
  
  export default cateReducer;