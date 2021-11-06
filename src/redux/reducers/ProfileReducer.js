import { mainAPI } from "../../api/api"
import { newNotice } from "./NoticeReducer"

const SET_USER_DATA = "profile/SET_USER_DATA"
const SET_FETCHING = "profile/SET_FETCHING"

const initState = {
    exercises: { completed: 0, solved: 0 },
    langs: { from: "", to: "" },
    email: "",
    isFetching: false,
}

const ProfileReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            }
        case SET_USER_DATA:
            const { exercises, langs, email } = action.userData

            return {
                ...state,
                exercises,
                langs,
                email,
            }

        default:
            return state
    }
}

const setFetching = (payload) => ({
    type: SET_FETCHING,
    payload,
})

const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData,
})

export const getUserData = () => async (dispatch) => {
    dispatch(setFetching(true))
    try {
        const userData = await mainAPI.getUserData()

        dispatch(setUserData(userData))
    } catch (error) {
        dispatch(newNotice(error.message, "warning"))
    }
    dispatch(setFetching(false))
}

export default ProfileReducer
