export const refreshReducers = (state = {}, action) => {
    switch (action.type) {
        case "REFRESH":
            return Math.random()
            
        default:
            return state;
    }
};