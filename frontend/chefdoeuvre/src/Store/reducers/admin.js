const initialStates = {
    token: null,
    email: null,
    id: null
 };
 
 const adminReducer = (state = initialStates, action) => {
   switch (action.type) {
     case "SIGNIN_ADMIN":
       localStorage.setItem("id", action.id)
       return {
         ...state,
         token: action.token,
         email: action.email,
         id: action.id
       };
     case "SIGNOUT_ADMIN":
       return {
         ...state,
         token: null,
         email: null,
         id: null
       };
     default:
       return {
         ...state,
       };
   }
 };
 
 export default adminReducer;