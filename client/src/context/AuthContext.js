import { createContext , useReducer, useEffect} from "react"
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
user:JSON.parse(localStorage.getItem("user")) || null,
//     user: JSON.parse(localStorage.getItem("user")) || {
// _id: "61ea892a2965fc3ed5b2fe4f",
// username:"Gulshan",
// email:"Gulshan@gmail.com",
// followers:[],
// followings:[],
// isAdmin:false,
// coverPicture:"nocover.jpg",
// profilePicture:"gulshan.jpg",
// },
isFetching: false,
error: false,
}
  
  
  export const AuthContext = createContext(INITIAL_STATE);
  
  export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
    useEffect(()=>{
      localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
    
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };