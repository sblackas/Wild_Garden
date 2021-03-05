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
          };
          case "DELETE_USER":
            let indexOfElemToDelete  = state.users.map(e => e.id_user).indexOf(action.payload);
            return {
              ...state,
              users: [
                      ...state.users.slice(0, indexOfElemToDelete),
                      ...state.users.slice(
                        indexOfElemToDelete + 1,
                        state.users.length
                      ),
                    ],
                  };
     default:
       return {
         ...state,
       };
   }
 };
 
 export default artistReducer;