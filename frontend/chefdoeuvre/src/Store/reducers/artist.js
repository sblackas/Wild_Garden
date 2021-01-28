const initialStates = {
    token: null,
    email: null,
    id: null,
    users: []
 };
 
 const artistReducer = (state = initialStates, action) => {
   switch (action.type) {
     case "SIGNIN_ARTIST":
       localStorage.setItem("id", action.id)
       return {
         ...state,
         token: action.token,
         email: action.email,
         id: action.id
       };
     case "SIGNOUT_ARTIST":
       return {
         ...state,
         token: null,
         email: null,
         id: null
       };
      //  case "LOAD_USER" :
      //    return {
      //      ...state,
      //      id: action.id
      //    }
      case "GET_ALL_USERS":
        return {
          ...state,
          users: action.payload
        };
        case "GET_DATA_USER":
          return {
            ...state,
            name: action.name,
            lastname: action.lastname,
            email: action.email,
            pp: action.pp
          };
     default:
       return {
         ...state,
       };
   }
 };
 
 export default artistReducer;