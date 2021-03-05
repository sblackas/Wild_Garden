const initialStates = {
    token: localStorage.getItem("tokenAdmin") || null,
    email: localStorage.getItem("email") || null ,
    id: parseInt(localStorage.getItem('id') ) || null
 };
 
 const adminReducer = (state = initialStates, action) => {
   switch (action.type) {
     case "SIGNIN_ADMIN":
       localStorage.setItem("id", action.id)
       console.log(action);
       return {
         ...state,
         token: action.token,
         email: action.email,
         id: parseInt(action.id)
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