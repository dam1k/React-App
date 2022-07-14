import {createContext, useReducer} from "react"
import GithubReducer from "./GithubReducer"


const GithubContext = createContext()

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export function GithubProvider({children}) { 
    const [state, dispatch] = useReducer(GithubReducer, {users: [], user: {}, isLoading: false})
    
    //Get search results
    async function searchUsers(user) {
        setLoading();

        const params = new URLSearchParams({
            q:user
        })
        const response = await fetch(`https://api.github.com/search/users?${params}`, {
            headers: {
                authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const {items} = await response.json()
        dispatch({type: "GET_USERS", payload: items})

    }

    //Get a single user
    async function getUser(login) {
        setLoading();

        const response = await fetch(`https://api.github.com/users/${login}`, {
            headers: {
                authorization: `token ${GITHUB_TOKEN}`
            }
        })

        if(response.status === 404) {
            window.location = "/notfound"
        } else {
            const data = await response.json()
            dispatch({type: "GET_USER", payload: data})
        }
    }

    function setLoading() {
        dispatch({type: 'SET_LOADING'})
    }

    function clearUsers() {
        dispatch({type: "CLEAR_USERS"})
    }

    return <GithubContext.Provider value={{ 
        searchUsers,
        users: state.users,
        isLoading: state.isLoading,
        clearUsers,
        user: state.user,
        getUser
     }}>
        {children}
         </GithubContext.Provider>

}

export default GithubContext
