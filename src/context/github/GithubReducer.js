const GithubReducer = (state, {type, payload}) => {
    switch(type) {
        case 'GET_USERS':
        return {
            ...state,
            users: payload,
            isLoading: false

        }
        case "SET_LOADING":
            return {
                ...state,
                isLoading:true
            }
        case "CLEAR_USERS":
        return {
            users: [],
            isLoading:false
        }
        case "GET_USER":
            return {
                ...state,
                user: payload.data,
                isLoading: false
            }

        default:
            return state
        
    }
}

export default GithubReducer