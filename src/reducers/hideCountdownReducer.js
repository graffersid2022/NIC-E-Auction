export const hideCountdownReducer = (state = {}, action) => {
    switch (action.type) {
        case "HIDE_COUNTDOWN":
            return true
            
        default:
            return state;
    }
};