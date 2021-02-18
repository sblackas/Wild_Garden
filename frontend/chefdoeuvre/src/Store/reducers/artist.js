const initialStates = {
    token: null,
    email: null,
    id: null,
    users: [],
    userData: []
 };
 
 const artistReducer = (state = initialStates, action) => {
   switch (action.type) {
     case "SIGNIN_ARTIST":
      //  localStorage.setItem("id", action.id)
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
      case "GET_ALL_USERS":
        return {
          ...state,
          users: action.payload
        };
        case "GET_DATA_USER":
          return {
            ...state,
            userData: action.payload
            // name: action.name,
            // lastname: action.lastname,
            // email: action.email,
            // pp: action.pp,
            // id: action.id

          };
     default:
       return {
         ...state,
       };
   }
 };
 
 export default artistReducer;